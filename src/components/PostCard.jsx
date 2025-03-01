import React from 'react'
import service from '../appwrite/appwriteConfig'
import { Link } from 'react-router-dom'

function PostCard({$id ,title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-500 rounded-xl p-4 '>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} className='rounded-xl' alt={title} />
            </div>
            <h2 className='font-bold text-xl'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard