"use client";
import Image from 'next/image';
import React from 'react'

const error = () => {
  return (
    <div className='h-[90vh] flex justify-center flex-col items-center py-10'><Image src={'/images/error.png'} width={500} height={500} alt='error'/>
    
    <p className='text-[30px] font-bold tracking-widest md:text-[37px] text-gray-600 dark:text-gray-300'>An error occured </p>
      
    </div>
  )
}

export default error