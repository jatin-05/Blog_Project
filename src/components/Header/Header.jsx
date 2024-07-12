import React from 'react'

import { LogoutButton, Container , Logo } from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function Header() {
  const authStatus = useSelector( (state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems =[
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active: !authStatus,
    },
    {
      name:'SignUp',
      slug:'/SignUp',
      active:!authStatus
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    },
  ]
  return (
    <header className='py-3 bg-black'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo img='white-Logo.png'  />
            </Link>
          </div>

          <ul className='flex ml-auto text-white'>
            {
              navItems.map((obj)=>
              obj.active ? (
              <li key={obj.name}>
                <button onClick={()=> navigate(obj.slug)} className='px-6 py-2 '>
                    {obj.name}
                </button>
              </li>
              ): null
            )
            }
            {
              authStatus && (<li> <LogoutButton/>  </li>)
            }
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header

