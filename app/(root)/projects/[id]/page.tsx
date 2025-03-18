import Loader from '@/components/Loader'
import React, { Suspense } from 'react'

const ProjectDetails = async () => {
  return (
    <div className='h-screen text-primary-color2 text-5xl flex items-center justify-center'>ProjectDetails</div>
  )
}

export default function page() {
    return (
        <Suspense fallback={<Loader />}>
            <ProjectDetails />   
        </Suspense>
    )
  }