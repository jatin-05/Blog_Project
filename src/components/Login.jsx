import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login  as storeLogin } from '../store/authSlice'
import {Input , Button , Logo } from './index'
import { useDispatch } from 'react-redux'
import service from '../appwrite/appwriteConfig'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {register , handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                console.log(userData)
                if(userData){
                    dispatch(storeLogin(userData))}
                    navigate("/")
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex justify-center items-center w-full h-auto'>
        <div className='mx-auto w-full max-w-lg bg-white text-black rounded-xl border border-black/10'>
            <div className='mb-3 flex justify-center'>
                <span className='mt-2'>
                  <Logo/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold'>Sign in to your Account</h2>

            <p className='mt-2 text-base text-center '> 
                dont have an account? 
                <Link to='/signup' className='font-medium hover:underline'>
                  Sign Up 
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8  text-center'>{error}</p>}

            <form onSubmit={handleSubmit(login) } className='mt-8'>
                <div className='space-y-5 '>
                   

                    <Input 
                    label="email"
                    type="email"
                    
                    placeholder="Email Comes Here"
                    {...register('email', {
                        required:true,
                        validate:{
                            matchPattern : (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value)||"email address must be a valid address"
                        }
                    }  )} 
                    />
                    

                    <Input
                    label="password"
                    type="password"
                
                    placeholder="password Here"
                    {...register("password" , {
                         required: true,   
                    })}/>
                    <div className='flex justify-center'>
                    <Button type='submit' className='w-full border mb-2'>Sign In</Button>

                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login