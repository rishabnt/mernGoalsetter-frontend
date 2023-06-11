import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL + '/api/goals/'

//Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(apiURL, goalData, config)

  return response.data
}

//Get all user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(apiURL, config)

  return response.data
}

//Update user goal 
const updateGoal = async (goalData, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }
  // console.log(goalData[1])
  if (!goalData[1].text) {
    goalData[1].text = ''
    console.log(goalData[1])
  }

  const response = await axios.post(apiURL+goalData[0], goalData[1], config)

  return response.data
}

//Delete user goal 
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(apiURL+goalId, config)
  console.log(response)

  return response.data
}

const goalService = {
  createGoal,
  getGoals, 
  updateGoal,
  deleteGoal,
}

export default goalService