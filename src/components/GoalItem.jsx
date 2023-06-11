import { useDispatch, useSelector } from 'react-redux'
import { deleteGoal, updateGoal, reset } from '../features/notes/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const goalText = goal.text;
  const timer = null;
  const editMode = true;

<<<<<<< HEAD
=======
  const handleChange = (e, goal) => {
    // e.preventDefault()
    clearTimeout(timer)
    const goalData = {text: e.target.value}
    const goalId = goal._id
    timer = setTimeout(() => {
      dispatch(updateGoal([goalId, goalData]))
    }, 3000)
    // e.target.value = goal.text
  }

>>>>>>> c2f9251a6aa8928687b563497b68ae628e5eb46e
  return (
    <div className="goal">
      <div>
        {new Date(goal.updatedAt).toLocaleString('en-IN')}
      </div>
<<<<<<< HEAD
      <h2>{goalText}</h2>
=======
      {/* <input id="goal" type="text" value={goalText} onChange={e => handleChange(e, goal)} /> */}
      <h2 id='text'>{goalText}</h2>
>>>>>>> c2f9251a6aa8928687b563497b68ae628e5eb46e
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>x</button>
    </div>
  )
}

export default GoalItem