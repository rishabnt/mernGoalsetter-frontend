import { BiMicrophone, BiPause, BiXCircle } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/notes/goalSlice'
import { formatMinutes, formatSeconds } from "../utils/format-time";
import { startRecording, saveRecording } from "../features/handlers/recorder-controls";
// const config = require('dotenv')

const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
let blob

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

function GoalForm() {
  const [text, setTxt] = useState()

  const dispatch = useDispatch()

  const uploadRecording = async (filename, file) => {
    await s3
      .putObject({
        Body: file, 
        Bucket: 'mernaudiobucket', 
        Key: filename,
        ContentType: 'audio/mpeg',
        ACL: 'public-read'
      })
      .promise()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(blob != null) {
      const filename = Math.random().toString(16).substring(2,8)
      uploadRecording(filename, blob)
        .then(promise => {
          dispatch(createGoal({text, filename}))
        })
    } else {
      dispatch(createGoal({text}))
    }
  }

  const [recorderState, setRecorderState] = useState(initialState);
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];
    console.log(recorder)

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  const record = () => startRecording(setRecorderState)
  const cancelRecording = () => setRecorderState(initialState)
  const saveRecord = () => saveRecording(recorderState.mediaRecorder)
  
  return (
    <section className='form'>
      <form action="submit" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <div>
            <input type="text" id='text' value={text} onChange={(e) => setTxt(e.target.value)}/>
            <div className="recording-time">
              {initRecording && <div className="recording-indicator"></div>}
              <span>{formatMinutes(recordingMinutes)}</span>
              <span>:</span>
              <span>{formatSeconds(recordingSeconds)}</span>
            </div>
            <div className="recording-container">
              {initRecording ? 
                <>
                  <div className="save-button-container">
                    <button className="save-button" onClick={saveRecord}>
                      <BiPause /> 
                    </button>
                  </div>
                  <div className="cancel-button-container">
                    <button className="cancel-button" onClick={cancelRecording}>
                      <BiXCircle /> 
                    </button>
                  </div>
                </>
              : 
                <div className="record-button-container">
                  <button className="record-button" onClick={record}>
                    <BiMicrophone size="2em" /> 
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Add Goal</button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm