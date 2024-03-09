'use client'

import { useEffect, useState } from "react"
import getPosts from '@/services/index'
import PostCard from "./PostCard"

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async() => {
      const result = await getPosts()
      setPosts(result)
    }
    
    fetchPosts()
  },[])
  
  return (
    <div>
       {
        posts.map((post, idx) => (
          <PostCard
          key={idx}
          node={post}
          />
        ))
      }
    </div>
  )
}

export default Posts