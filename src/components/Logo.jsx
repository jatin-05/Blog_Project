import React from 'react'

function Logo({
  img='logo-design_6415824.png'
}) {
  
  return (
    <div><img src={`/public/logo/${img}`} className=' size-12' alt="" /></div>
  )
}

export default Logo


// /logo/${img}