import { useState, useEffect } from 'react'
import authService from './appwrite/auth'

import './App.css'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import {Footer , Header} from './components/index'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch= useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=> {
      if (userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  

  return !loading ? (
    <div>
      <Header/>
      <main>
       TODO: {/* <outlet/> */}
      </main>
      <Footer/>
      
    </div>
  ): null
}

export default App
