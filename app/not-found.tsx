"use client";
import Image from 'next/image';
import React from 'react'

const error = () => {
  return (
    <div className='flex flex-col h-screen justify-start items-center'><img src={'/images/not-found.png'} width={600} height={300} className='h-[60vh]' alt='not_found_page'/>
      <p className='text-[30px] font-bold tracking-widest md:text-[50px]'>Page Not Found </p>
    </div>
  )
}

export default error