import { useDispatch, useSelector } from 'react-redux'
import { deleteGoal, updateGoal, reset } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const goalText = goal.text;

  const handleChange = (e, goal) => {
    // e.preventDefault()
    const goalData = {text: e.target.value}
    const goalId = goal._id
    dispatch(updateGoal([goalId, goalData]))
    e.target.value = goal.text
  }

  return (
    <div className="goal">
      <div>
        {new Date(goal.updatedAt).toLocaleString('en-IN')}
      </div>
      <input id="goal" type="text" value={goalText} onLoad={e => {e.target.value = goalText}} onChange={e => handleChange(e, goal)} />
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>x</button>
    </div>
  )
}

export default GoalItem