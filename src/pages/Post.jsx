import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/appwriteConfig'
import { Button , Container} from '../components/index'
import { useSelector } from 'react-redux'
import  parse  from 'html-react-parser'


function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? userData.$id === post.userId : false

    useEffect(() => {
      if(slug){
    service.getPost(slug).then ((post)=>{
        if (post) setPost(post);
        else navigate("/")
    })
      }else navigate('/')
    }, [slug, navigate])

    const deletePost= ()=> {
        service.deletePost(post.$id).then((status) => {
            if(status){
                service.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }
    
  return post ? (
    <div>
        <Container>
            <div className='border p-2 mt-5 relative'>
                <h1 className='text-5xl font-bold text-center'>{post.title}</h1>
                <div className='w-full flex justify-center relative rounded-xl p-2'>
                
                    <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className=' mt-4 rounded-xl' 
                     style={{width:325}}
                    />
                    </div>

                    {isAuthor && (  
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}  `}>
                                <Button bgColor='' className='bg-green-500 mr-3'>Edit</Button>
                            </Link>
                            <Button bgColor='' className="bg-red-500" onClick={()=>{

                                
                                if (confirm('Are you Sure You want to delete the post'))
                                deletePost()
                            }
                                }   >Delete</Button>
                        </div>
                    )}

                    <div className='w-full mb-6'>   
                        
                    </div>
                    <div className='browser-css'>{parse(post.content)}</div>
            </div>
        </Container>
    </div>
  ):(null)
}

export default Post