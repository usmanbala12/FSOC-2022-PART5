import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<Blogform addblog={createBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  await user.type(title, 'my new blog')
  await user.type(author, 'usman bala')
  await user.type(url, 'https://testblog.com')

  const sendButton = screen.getByText('create')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'my new blog',
    author: 'usman bala',
    url: 'https://testblog.com'
  })
})
