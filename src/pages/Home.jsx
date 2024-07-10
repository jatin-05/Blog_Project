import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import {Container, PostCard} from '../components/index'
import AllPosts from './AllPosts'
function Home() {
    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //   service.getAllPosts().then((post)=>{
    //     if(post){
    //         setPosts(post.documents)
    //     }
    //   })
    // }, [])

    if (posts.length === 0) {
        return <Container>
            No Posts Found || Login to Read Posts   
        </Container>
    }
    
  return (

    <div className='w-full py-8'>
        <AllPosts/>
    </div>
  )
}

export default Home

