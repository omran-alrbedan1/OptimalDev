import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center '>
      <Image 
        src={'/loading.gif'}
        width={600}
        height={600}
        alt='loader'
      />
    </div>
  )
}

export default Loader