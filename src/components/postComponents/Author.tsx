import Image from 'next/image';
import React from 'react'

interface Photo {
  url: string;
}

type Author = {
  author: {
    bio: string,
  id: string, 
  name: string,
  photo: Photo;
  }
}

const Author = (author: Author) => {
  return (
    <div className='text-center mt-20 mb-8 relative rounded-lg bg-black  p-12 bg-opacity-20'>
      <div className='absolute right-0 left-0  -top-14'>
      <Image
      height={100}
      width={100}
      className='align-middle rounded-full'
      src={author.author.photo.url}
      alt={author.author.id}
      />
      </div>
      <h3 className='text-white my-4 text-xl font-bold'>{author.author.name}</h3>
      <p className='text-white text-lg'>{author.author.bio}</p>

    </div>
  )
}

export default Author