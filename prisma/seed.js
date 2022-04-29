const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getBlogs().map((blog) => {
      return db.blog.create({ data: blog })
    })
  )
}

seed()

function getBlogs() {
  return [
    {
      title: 'JavaScript Performance Tips',
      author: 'sohaib',
      body: `We will look at 10 simple tips and tricks to increase the speed of your code when writing JS`,
    },
    {
      title: 'Tailwind vs. Bootstrap',
      author: 'raouf',
      body: `Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them`,
    },
    {
      title: 'Writing Great Unit Tests',
      author: 'redha',
      body: `We will look at 10 simple tips and tricks on writing unit tests in JavaScript`,
    },
    {
      title: 'What Is New In PHP 8?',
      author: 'abdessamed',
      body: `In this article we will look at some of the new features offered in version 8 of PHP`,
    },
  ]
}