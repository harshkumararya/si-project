import React from 'react'

const Navbar = ({containerStyles}) => {
  return (
    <div >
      <nav className={`${containerStyles}`}>
        <a href="#home" className='isactive'>Home</a>
        <a href="#shop" className=''>Shop</a>
        <a href="#contact" className=''>Contact</a>

      </nav>
    </div>
  )
}

export default Navbar
