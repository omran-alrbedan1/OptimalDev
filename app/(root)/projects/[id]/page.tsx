import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";
import { Carousel } from "@/components/cards/Carousel";
import Image from "next/image";
import CategoryCard from "@/components/cards/CategoryCard";
import { Category } from "@/types";
import Animation from "@/components/animation/Animation";

interface Props {
  params: {
    id: number;
  };
}

const ServicesPage = async ({ id }: { id: number }) => {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 200));

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
    <div className="min-h-screen py-20 pt-36 md:pt-40 px-4 sm:px-8 lg:px-10">
      {/* Project Header */}
      <div className="max-w-7xl mx-auto text-center pb-10">
       
          <Animation animationVertix={'y'} text={project.title} style={ {letterSpacing: "3px" }}  className={"text-3xl md:text-4xl font-semibold mb-4"}/>
         
          {/* <Animation text={project.title}/> */}
        <Animation className="text-lg text-gray-600" animationVertix="y" text={project.sub_title} />
      </div>
      <div className="flex w-full max-lg:flex-col-reverse justify-center">
        <div className="flex justify-center flex-1 p-4 pt-10 md:pl-10">
          <Animation
            className="lg:text-lg"
            style={{ letterSpacing: "1.7px", lineHeight: "2.4rem" }}
          animationVertix="x"
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nam
            dolore voluptas eaque eum perferendis consectetur vero blanditiis
            ipsum illo adipisci voluptates soluta a velit cum impedit,
            excepturi, natus ipsam.Lorem Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Optio fugiat quae minima autem sequi commodi
            incidunt eum magnam rem pariatur aliquid, excepturi, at harum
            laudantium qui officia soluta dolorum adipisci!"
          />
        </div>
        <div className="flex flex-1 px-4 items-center justify-center">
          <Image
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt={project.title}
            width={500}
            height={400}
            className="rounded-xl h-full xl:w-[80%] aspect-auto" // Ensure the image scales properly
          />
        </div>
      </div>

      <div className="py-24 md:py-32 overflow-hidden max-w-5xl lg:max-w-6xl mx-auto">
        {" "}
        <Carousel slides={project.files} />
      </div>

      <div className="max-w-6xl mx-auto py-14 px-2 text-center">
        <Animation animationVertix="y" className="text-2xl mb-20 font-bold"
          text="Project Responsibilities"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.categories.map((category: Category, index: number) => (
        <CategoryCard key={category.id} category={category} index={index}/>
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
