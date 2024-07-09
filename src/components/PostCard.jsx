import React from 'react'
import service from '../appwrite/appwriteConfig'
import { Link } from 'react-router-dom'

function PostCard({$id ,title, featuredImage}) {
  return (
    <link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} className='rounded-xl' alt={title} />
            </div>
            <h2 className='font-bold text-xl'>{title}</h2>
        </div>
    </link>
  )
}

export default PostCard