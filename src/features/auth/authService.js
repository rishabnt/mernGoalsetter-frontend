import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL + '/api/users/'
console.log(process.env);

// Register user
const register = async (userData) => {
  const response = await axios.post(apiURL, userData)

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // console.log(response)

  return response.data

}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const login = async (userData) => {
  console.log(apiURL + 'login')
  const response = await axios.post(apiURL + 'login', userData)
  console.log(response)

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // console.log(response)

  return response.data
}

const authService = {
  register, logout, login
}

export default authService