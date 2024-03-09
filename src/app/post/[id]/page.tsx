'use client'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '@/constant'
import {  getPostDetails } from '@/services'
import { PostData } from '@/types/Types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"

const Post = ({ params }) => {
  const slug: {id: string} = useParams()
  const [post, setPost] = useState<PostData | null>(null)

// console.log(post)

  useEffect(() => {
    const fetchPosts = async() => {
      const result = await getPostDetails(slug.id)
      // console.log(result)
      setPost(result)
    }
    fetchPosts()
  },[slug])
console.log(post?.author)

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
        {post && <PostDetail post={post}/>}
          {post && <Author author={post.author}/>}
          {post && <CommentsForm slug={post.slug}/>}
          {post && <Comments slug={post.slug}/>}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget slug={post?.slug} 
            categories={post?.categories?.map((category) => category?.slug)}
            />
            <Categories/>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Post

