"use client";
import Image from 'next/image';
import React from 'react'

const error = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center'><Image src={'/images/NotFound.png'} width={500} height={500} alt='error'/></div>
  )
}

export default error