import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";
import { Carousel } from "@/components/cards/Carousel";

import CategoryCard from "@/components/cards/CategoryCard";
import { Category } from "@/types";
import Animation from "@/components/animation/Animation";
import HrefCard from "@/components/cards/HrefCard";

interface Props {
  params: {
    id: number;
  };
}

const ProjectPage = async ({ id }: { id: number }) => {

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
    <div className="min-h-screen py-20 pt-36 md:pt-40  sm:px-8 lg:px-10">
      {/* Project Header */}
      <div className="max-w-7xl mx-auto text-center pb-4 md:pb-10 px-4">
        <Animation
          duration={1}
          delay={0.5}

          animationVertix={"y"}
          text={project.title}
          style={{ letterSpacing: "3px" }}
          className={
            "text-2xl md:text-3xl lg:text-4xl text-primary-color1 hover:text-primary-hover font-semibold mb-4"
          }
        />

        <Animation
          duration={1}
          delay={0.8}
          className="text-[17px] md:text-[18px] text-gray-600 lg:px-32 text-center dark:text-gray-300"
          animationVertix="y"
          text={project.subtitle}
        />
      </div>
      {(project.content || project.description) && <div className="mx-auto max-w-7xl pt-12 pb-5 md:py-12 sm:px-10 px-6">
        <Animation animationVertix="right"
          duration={1} delay={0.8}
        >
          <p className="sm:text-[18px] text-[14px] dark:text-gray-300 uppercase tracking-wider text-gray-500">
            Introduction
          </p>
          <h2 className="font-bold md:text-[35px] sm:text-[30px] text-[25px] tracking-wider">
            Project Overview.
          </h2>
        </Animation>

        <div

          className="mt-4 text-[14px] max-w-6xl leading-[30px] tracking-wider  text-gray-600 dark:text-gray-300"
        >
          <Animation
            delay={1.2}
            duration={0.7}
            animationVertix="y"
          >

            <p
              className="dark:text-gray-300  prose-strong:dark:text-white"
              dangerouslySetInnerHTML={{
                __html: project.description
              }}

            />
          </Animation>
          <Animation
            delay={1.2}
            duration={0.9}
            animationVertix="y"
          >

            <p
              className="dark:text-gray-300  prose-sm lg:prose-lg prose-ul:list-disc prose-ul:pl-10 lg:prose-ul:pl-20 prose-h3:dark:text-white prose-h3:font-bold prose-strong:font-bold prose-strong:dark:text-white"
              dangerouslySetInnerHTML={{
                __html: project.content
              }}

            />
          </Animation>
        </div>
      </div>}
      <div className="pb-24 md:pb-32 pt-8 md:pt-10 w-full   max-w-5xl lg:max-w-6xl mx-auto overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        {" "}
        <Carousel slides={project.files} />
      </div>

      {project.categories.length > 0 && <div className="max-w-7xl mx-auto py-14 sm:px-10 px-6">
        <div className="pb-16">

          <Animation animationVertix="right" className="py-3"
           duration={1} delay={0.3}>

            <h2 className="font-bold md:text-[35px] sm:text-[28px] text-[23px] tracking-wider">
              Project Responsibilities
            </h2>
          </Animation>
          <Animation
            delay={0.5}
            duration={1}
            animationVertix="y"
            className="mt-4 text-[14px] max-w-5xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"
          >
            <p>
              The responsibilities outlined here represent the structured approach
              taken to execute the project. Each responsibility corresponds to a
              specific phase or domain, ensuring that all aspects of the project
              are addressed systematically and efficiently.
            </p>
          </Animation>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-14 lg:gap-y-16">
          {project.categories.map((category: Category, index: number) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </ul>


      </div>}
      {project.project_link && (<HrefCard url={project.project_link ?
        (project.project_link.startsWith('http') ? project.project_link : `https://${project.project_link}`)
        : ''} />)}



    </div>
  );
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <ProjectPage id={id} />
    </Suspense>
  );
}
