import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex justify-center gap-1 items-center h-screen'>
        <div className='animate-pulse h-6 w-6 rounded-full border-b-2 border-t-2 border-white bg-red-800'/>
        <div className='animate-pulse h-6 w-6  rounded-full border-b-2 border-t-2 border-white bg-red-800'/>
        <div className='animate-pulse h-6 w-6  rounded-full border-b-2 border-t-2 border-white bg-red-800'/>
        
            
        
    </div>
  )
}

export default LoadingPage