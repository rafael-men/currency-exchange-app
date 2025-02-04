import React from 'react'
import Image from 'next/image'
import Main from '../Assets/Money.png'

const Navbar = () => {
  return (
    <nav className="bg-black p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Image src={Main} alt="Logo" className='w-10 h-10' />
        </div>  
      </div>
    </nav>
  )
}

export default Navbar
