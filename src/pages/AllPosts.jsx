import React , {useState, useEffect} from 'react'
import service from '../appwrite/appwriteConfig'
import { PostCard , Container} from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getAllPosts([]).then((posts)=>{
            if(posts) {setPosts(posts.documents)}
        })
    }, [])
    
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

export default AllPosts