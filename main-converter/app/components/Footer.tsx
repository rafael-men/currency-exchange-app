import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black py-6 mt-32 shadow-inner text-white'>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm font-mono">
          <p className="mt-2 sm:mt-0">
            Desenvolvido por 
            <a 
              href="https://github.com/seu-rafael-men" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline ml-1"
            >
              Rafael
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
