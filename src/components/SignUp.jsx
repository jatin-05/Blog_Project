import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import service from '../appwrite/appwriteConfig'
import authService from '../appwrite/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'

import {Logo , Button , Input} from './index'
import { useDispatch } from 'react-redux'

 

function SignUp() {
   const navigate= useNavigate()
   const dispatch=useDispatch()
   const [error, setError] = useState("")
   const {register , handleSubmit} =useForm()

   const create = async (data) =>{
    setError('')
    try {
        const userData = await authService.createAccouunt(data)
        if (userData){
            const userData= await authService.getCurrentUser()
            if(userData){
                dispatch(storeLogin(userData))
                navigate( "/")
            }
        }
    } catch (error) {
        setError(error.message)
    }
   }


  return (
    <div className='w-full flex items-center justify-center h-auto  '>
        <div className='mx-auto w-full max-w-lg bg-white text-black rounded-xl border border-black/10'>  
            <div className='mb-3 flex justify-center'>
                    <span className=' mt-2'>
                    <Logo/>
                    </span>
                </div>
            <h2 className='text-center text-2xl font-bold'>Sign up to create Account</h2>

            <p className='my-2 mb-4 text-base text-center '> 
                already have an account? 
                <Link to='/login' className='font-medium hover:underline'>
                   Login 
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-3 '>
                <Input 
                    label="Full Name"
                    type="text"
                    placeholder="enter your Full Name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input 
                    label="email"
                    type="email"
                    placeholder="enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern : (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value)||"email address must be a valid address"
                        }
                    })}
                    />
                    <Input
                    label='password'
                    type='password'
                    placeholder='create Password'
                    {...register('password' , {
                        required:true
                    })}
                    />
                    <div className='flex justify-center mb-2'>
                    <Button type="submit" className='rounded-lg border mb-2'>
                        Sign Up
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp