import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const update = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`/api/blogs/${data.id}`, data, config)
  return response.data
}

const deleteblog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`/api/blogs/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update , deleteblog }