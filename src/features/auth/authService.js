import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

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
  console.log(API_URL + 'login')
  const response = await axios.post(API_URL + 'login', userData)
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