import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";
import { Carousel } from "@/components/cards/Carousel";
import Image from "next/image";

interface Props {
  params: {
    id: number;
  };
}

const ServicesPage = async ({ id }: { id: number }) => {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch project data
  const response = await axios.get(
    `https://main.hivetech.space/api/projects/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const project = response.data.data;
  console.log(project);

  return (
    <div className="min-h-screen py-12 pt-36 px-4 sm:px-6 lg:px-8">
      {/* Project Header */}
      <div className="max-w-7xl mx-auto text-center pb-10">
        <h1
          className="text-3xl md:text-4xl font-semibold text-primary-color2 mb-4"
          style={{ letterSpacing: "2.6px" }}
        >
          {project.title}
        </h1>
        <p className="text-lg text-gray-600">{project.subtitle}</p>
      </div>
      <div className="flex w-full max-lg:flex-col-reverse justify-center">
        <div className="flex justify-center flex-1 p-4 pt-10 md:pl-10">
          <p
            className="lg:text-lg"
            style={{ letterSpacing: "1.7px", lineHeight: "2.4rem" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nam
            dolore voluptas eaque eum perferendis consectetur vero blanditiis
            ipsum illo adipisci voluptates soluta a velit cum impedit,
            excepturi, natus ipsam.Lorem Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Optio fugiat quae minima autem sequi commodi
            incidunt eum magnam rem pariatur aliquid, excepturi, at harum
            laudantium qui officia soluta dolorum adipisci!
          </p>
        </div>
        <div className="flex flex-1 p-4 items-center justify-center">
          <Image
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt={project.title}
            width={500}
            height={400}
            className="" // Ensure the image scales properly
          />
        </div>
      </div>

      <div className=" py-28 overflow-hidden max-w-5xl lg:max-w-6xl mx-auto ">
        {" "}
        <Carousel slides={project.files} />
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-10">
          Project Responsibilities
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.categories.map((category: any) => (
            <li
              key={category.id}
              className="relative min-h-36  flex flex-1  p-6 bg-[#f8f9fa]  flex-col justify-between"
            >
              {category.image && (<img className="absolute h-full w-full"src={category.image} alt={`image${category.id}`} />)}
              <div className="absolute w-full h-full flex-col justify-between ">
              {category.image_icon && <img className=""src={category.image_icon} alt={`image_icon${category.id}`} />}
              <h3 className="mb-3 font-semibold text-2xl">{category.title}</h3>
              <p className="mr-5">{category.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="mt-6">
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
      </div> */}
    </div>
  );
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <ServicesPage id={id} />
    </Suspense>
  );
}
