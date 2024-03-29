'use client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { Comment } from '@/types/Types'
import { getComments } from '@/services'

const Comments: React.FC<{slug: string}> = ({slug}) => {
  const [comments, setComments] = useState<Comment[]>([])
  console.log(comments)
  useEffect(() => {
    getComments(slug)
    .then(res => setComments(res))
  },[slug])

  return (
    <>
    {
      comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {
              comments.length    }
              { ' '} Comments
          </h3>
          {
            comments.map((comment : Comment) => (
              <div key={comment.createdAt}
              className='border-b border-gray-100 mb-4 pb-4'
              >
                <p className='mb-4 '>
                  <span className='font-semibold'>{comment.name}</span>
                  {' '}
                  on
                  { ' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}

                </p>
                <p className='whitespace-pre-line text-gray-600 w-full'>
                  {parse(comment.comment)}
                </p>
              </div>
            ))
          }
        </div>
      )
    }
    </>
  )
}

export default Comments