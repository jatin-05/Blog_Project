import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'


function LogoutButton() {
    const dispatch =useDispatch()
    const logoutHandler = ()=> {
        authService.logout().then(()=>{
            dispatch(logout())
            
        })
        
    }
  return (
    <button onClick={logoutHandler} className='px-6 py-2 rounded-md'>Logout</button>
  )
}

export default LogoutButton