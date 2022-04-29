import { useLoaderData } from '@remix-run/react'
import { redirect } from "@remix-run/node";
import { db } from '~/utils/db.server'

export const loader = async ({ params }) => {
  const blog = await db.blog.findUnique({
    where: { id: params.blogId },
  })

  if (!blog) throw new Error('Blog not found')

  const data = { blog }
  return data
}

export const action = async ({ request, params }) => {
  const form = await request.formData()
  if (form.get('_method') === 'delete') {
    const blog = await db.blog.findUnique({
      where: { id: params.blogId },
    })

    if (!blog) throw new Error('Blog not found')

    await db.blog.delete({ where: { id: params.blogId } })
    return redirect('/blogs')
  }
}

function Blog() {
    const { blog } = useLoaderData()
  return (
    <div>
      <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>{blog.body}</div>
            <div className='page-footer'>
              <form method='POST'>
                <input type='hidden' name='_method' value='delete' />
                <button>Delete</button>
              </form>
            </div>
        </article>
    </div>
  )
}

export default Blog