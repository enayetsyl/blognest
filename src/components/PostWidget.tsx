'use client'
import { getRecentPosts, getSimilarPosts } from "@/services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

type Props = {
  categories: string[];
  slug: string
}

const PostWidget = ({categories, slug}: Props) => {
  const [relatedPosts, setRelatedPosts] = useState([])
  
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
      .then((result) => setRelatedPosts(result))
    }else{
      getRecentPosts()
      .then((result) => setRelatedPosts(result))
    }
  }, [slug])

  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Post' : 'Recent Post'}
      </h3>
      {
        relatedPosts.map((post, index) => (
          <div 
          key={post?.title}
          className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
              src={post?.featuredImage?.url}
              height={60}
              width={60}
              alt={post?.title}
              className="align-middle rounded-full"
              
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/post/$post.slug`} className="text-sm">
                {post.title}
              </Link>
            </div>
          </div>

        ))
      }
    </div>
  )
}

export default PostWidget