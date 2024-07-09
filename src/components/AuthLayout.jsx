import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Protexted({children , authentication= true})    {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state=>state.auth.state)
useEffect(() => {
  if (authentication && authStatus!==authentication){
    navigate("/login")
  } 
  else if(!authentication && authStatus!== authentication){
    navigate('/')
  }
  setLoader(false)
}, [authStatus, navigate, authentication])


  return loader? <h1>Loading...</h1>: <>{children}</>
}

