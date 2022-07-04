import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, userid }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {
    const newBlog = {
      ...blog, likes: likes + 1
    }
    updateBlog(newBlog)
    setLikes(likes + 1)
  }

  const handleDelete = () => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }

  const detailedView = () => (
    <div className='detailedView'>
      {blog.url}
      <br />
      likes: {likes} <button onClick={handleLike}>Like</button>
      <br/>
      {userid === blog.user ? <button onClick={handleDelete}>delete</button> : ''}
    </div>
  )

  return(
    <div className="minimalView blogCard blog">
      <div> {blog.title} {blog.author} <button onClick={() => setView(!view)}>{view ? 'hide': 'view'}</button> </div>
      {view && detailedView()}
    </div>
  )

}

export default Blog