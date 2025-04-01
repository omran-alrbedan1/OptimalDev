"use client";
import Image from 'next/image';
import React from 'react'

const error = () => {
  return (
    <div className='flex flex-col h-screen justify-start items-center'><img src={'/images/page-not-found.png'} width={600} height={600} className='h-[60vh]' alt='not_found_page'/>
      <p className='text-[30px] font-bold tracking-widest md:text-[40px] text-gray-600 dark:text-gray-300'>Page Not Found </p>
    </div>
  )
}

export default error