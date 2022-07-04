import { useState } from 'react'

const Blogform = ({ addblog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    addblog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
                Title: <input type='text' id='title' value={title} placeholder='title' name='Title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                Author: <input type='text' id='author' placeholder='author' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                Url: <input type='text' id='url' value={url} placeholder='url' name='Url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit" id='addblog'>create</button>
      </form>
    </div>

  )
}

export default Blogform