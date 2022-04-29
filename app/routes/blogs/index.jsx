import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  const data = {
    blogs: await db.blog.findMany({
      take: 20,
      select: { id: true, title: true, author: true},
    }),
  }

  return data
}


function AllBlogs() {
  const { blogs } = useLoaderData()

  return (
    <div>
        <h1>All Blogs</h1>
        <div className="blog-list">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllBlogs