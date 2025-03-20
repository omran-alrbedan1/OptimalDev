import axios from "axios";
import ProjectCard from "@/components/cards/ProjectCard";
import { ProjectProps, ProjectsArray } from "@/types";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const  ProjectsPage = async () =>  {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await axios.get("https://main.hivetech.space/api/projects", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const projects = response.data.data;
  return (

      <section className="container flex flex-col items-center  mt-40 px-5 md:px-12">
        <Header
          title="All Projects"
          paragragh="this is the all of our projects"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-x-8 sm:gap-y-10 justify-items-center mx-auto mt-10 ">
          {projects.map((project: ProjectProps, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
   
  );
}

export default function page() {
  return (
        <Suspense fallback={<Loader />}><ProjectsPage /> </Suspense>
  )
}