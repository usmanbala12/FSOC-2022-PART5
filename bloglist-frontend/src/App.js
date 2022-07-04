import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogform from './components/Blogform'
import Togglable from './components/Toggalable'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const toggalableRef = useRef()

  useEffect(() => {
    const getdata =  async () => {
      const response = await blogService.getAll()
      response.sort((a, b) => b.likes - a.likes)
      setBlogs(response)
    }
    getdata()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappuser')
    setUser(null)
  }

  const addblog = async (blog) => {
    toggalableRef.current.toggleVisibility()
    const response = await blogService.create(blog)
    setBlogs(blogs.concat(response))
    setMessage({ message: `a new blog ${response.title} has been added`, type: 'success' })
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const updateBlog = async (blog) => {
    await blogService.update(blog)
  }
  const deleteBlog = async(id) => {
    await blogService.deleteblog(id)
    setBlogs(blogs.filter(item => item.id !== id))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userResult = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userResult)
      )
      blogService.setToken(userResult.token)
      console.log(userResult)
      setUser(userResult)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if(user === null){
    return (
      <form onSubmit={handleSubmit}>
        <Notification message={message} />
        <div>
          username: <input type='text' id='username' value={username} name='Username' onChange={({ target }) => {setUsername(target.value)}}/>
        </div>
        <div>
          password: <input type='password' id='password' value={password} name='password' onChange={({ target }) => {setPassword(target.value)}}/>
        </div>
        <button type='submit' id='login-submit'>login</button>
      </form>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>{user.name} is logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new note' ref={toggalableRef}>
        <Blogform addblog={addblog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userid={user.id} />
      )}
    </div>
  )
}

export default App
