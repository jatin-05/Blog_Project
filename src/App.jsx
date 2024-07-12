import { useState, useEffect } from 'react'
import authService from './appwrite/auth'

// import './App.css'
import { login, logout } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Footer , Header} from './components/index'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch= useDispatch()
 const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    console.log();
    authService.getCurrentUser(userData)
    .then((userData)=> {
      if (userData){
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  

  return !loading ? (
    <div className=''>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <div className=' translate-y-full w-full'>
      <Footer/>
      </div>
      
    </div>
  ): null
}

export default App



