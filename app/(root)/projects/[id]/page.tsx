// import Loader from '@/components/Loader'
// import axios from 'axios';
// import React, { Suspense } from 'react'

// interface props {
//   params: {
//     id: number;
//   }
// }

// const ServicesPage = async ({id}:{id: number}) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const response = await axios.get(`https://main.hivetech.space/api/projects/${id}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const projects = response.data.data;
//   return (
//     <div className='h-screen text-primary-color2 text-5xl flex items-center justify-center'>ProjectDetails {id}</div>
//   )
// }





// export default async function Page({params}: props) {
//   const { id } = await params;
  
//   return (
//     <Suspense fallback={<Loader />}>
//       <ServicesPage id={id}/>
//     </Suspense>
//   );
// }
import Loader from '@/components/Loader';
import axios from 'axios';
import React, { Suspense } from 'react';
import ImageSlider from '@/components/cards/ImageSlider'; // Import the Client Component

interface Props {
  params: {
    id: number;
  };
}

const ServicesPage = async ({ id }: { id: number }) => {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch project data
  const response = await axios.get(`https://main.hivetech.space/api/projects/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const project = response.data.data;

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-32 px-4 sm:px-6 lg:px-8">
      {/* Project Header */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary-color2 mb-4">{project.title}</h1>
        <p className="text-lg text-gray-600">{project.subtitle}</p>
      </div>

      {/* Image Slider */}
      <div className="mt-10">
        <ImageSlider files={project.files} />
      </div>

      {/* Project Details */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-primary-color2 mb-4">Project Overview</h2>
          <p className="text-gray-700">{project.description || 'No description available.'}</p>
          <p className="text-gray-700 mt-4">{project.content || 'No additional content available.'}</p>

          {/* Categories */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-primary-color2 mb-2">Categories</h3>
            <ul className="flex flex-wrap gap-2">
              {project.categories.map((category: any) => (
                <li
                  key={category.id}
                  className="bg-primary-color2 text-white px-3 py-1 rounded-full text-sm"
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="mt-6">
            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-color2 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
              >
                View Project
              </a>
            )}
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-color2 text-white px-4 py-2 rounded-md ml-4 hover:bg-opacity-90 transition duration-300"
              >
                Demo Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page({ params }: Props) {
  const { id } = params;

  return (
    <Suspense fallback={<Loader />}>
      <ServicesPage id={id} />
    </Suspense>
  );
}