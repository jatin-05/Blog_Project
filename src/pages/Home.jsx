import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import {Container, LogoutButton, PostCard} from '../components/index'
import AllPosts from './AllPosts'
function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
      service.getAllPosts().then((post)=>{
        if(post){
            setPosts(post.documents)
        }
      })
    }, [])

    if (posts.length === 0) {
        return <Container>
          <div className='text-center'>

            No Posts Found || Login to Read Posts   
          </div>
        </Container>
    }
    
     
    return (
      <div className='w-full py-8'>
          <Container>
                  <div className='flex flex-wrap'>
                      {posts.map((post)=> (
                          <div key={post.$id} className='p-2 w-1/4'>
                              <PostCard 
                                   {...post} //$id={post.$id} title={post.title} featuredImage={}
                              />
                          </div>
                      ))}
                  </div>
          </Container>
      </div>
    )
  }

export default Home

