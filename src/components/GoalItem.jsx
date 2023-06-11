import { useDispatch, useSelector } from 'react-redux'
import { deleteGoal, updateGoal, reset } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const goalText = goal.text;

  return (
    <div className="goal">
      <div>
        {new Date(goal.updatedAt).toLocaleString('en-IN')}
      </div>
      <h2>{goalText}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>x</button>
    </div>
  )
}

export default GoalItem