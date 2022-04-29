import { Link } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { db } from '~/utils/db.server'

export const action = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const author = form.get('author')
  const body = form.get('body')

  const fields = { title, author, body }

  const blog = await db.blog.create({ data: fields })

  return redirect(`/blogs/${blog.id}`)
}

function NewBlog() {
  return (
    <div className='create'>
      <h2>Add a New Blog</h2>
        <form method='POST'>
            <label htmlFor='title'>Blog title:</label>
            <input 
                type="text"
                name='title'
                id='title'
            />
            <label htmlFor='author'>Blog author:</label>
            <input 
                type="text"
                name='author'
                id='author'
            />
            <label htmlFor='body'>Blog body:</label>
            <textarea name='body' id='body'></textarea>
            <button type='submit'>Add Blog</button>
        </form>
    </div>
  )
}

export default NewBlog