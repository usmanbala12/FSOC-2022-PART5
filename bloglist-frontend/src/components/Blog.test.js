import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('displaying a blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title : 'my blog for test',
    author: 'usman bala',
    url: 'http://myblogfortest.com.ng',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.minimalView')
  expect(div).toHaveTextContent('my blog for test usman bala')

  const urlAndlikes = container.querySelector('.detailedView')
  expect(urlAndlikes).toBe(null)
})

test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title : 'my blog for test',
    author: 'usman bala',
    url: 'http://myblogfortest.com.ng',
    likes: 5,
    user: {
      name: 'usman',
      username: 'codegeek01'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  screen.queryByText('http://myblogfortest.com.ng')
  screen.queryByText('likes: 5')

})

test('test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title : 'my blog for test',
    author: 'usman bala',
    url: 'http://myblogfortest.com.ng',
    likes: 5,
    user: {
      name: 'usman',
      username: 'codegeek01'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()

  const view = screen.getByText('view')
  await user.click(view)

  const like = screen.getByText('Like')
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
