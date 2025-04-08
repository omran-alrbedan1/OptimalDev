import React, { Suspense } from "react";
import Image from "next/image"; // Next.js optimized image component
import Team from "../../../public/assets/team.png";
import Loader from "@/components/Loader";
import axios from "axios";
import Animate from "@/components/animation/Animate";
import { Teams } from "@/types";
import Link from "next/link";
// const teams = [
//   {
//     id: 1,
//     name: "Ahmad Mriwed",
//     bio: "Expert software engineer.",
//     image: "team1.jpg",
//     code: "ahmad_mriwed",
//     cv: "cv_john_doe.pdf",
//     position: "Project Manager",
//     whatsapp: null,
//     content: null,
//     phone: "+963937954969",
//     email: "mr.ahmadmirwed@gmail.com",
//     linkedin: "https://linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//     instagram: "https://instagram.com/johndoe",
//     facebook: "https://facebook.com/johndoe",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 9,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 8,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 7,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 2,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 6,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 5,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 4,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 10,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
//   // Add more team members here as needed
//   {
//     id: 3,
//     name: "Jane Smith",
//     bio: "UI/UX Designer.",
//     image: "team2.jpg",
//     code: "jane_smith",
//     cv: "cv_jane_smith.pdf",
//     position: "Design Lead",
//     whatsapp: null,
//     content: null,
//     phone: "+1234567890",
//     email: "jane.smith@example.com",
//     linkedin: "https://linkedin.com/in/janesmith",
//     github: "https://github.com/janesmith",
//     instagram: "https://instagram.com/janesmith",
//     facebook: "https://facebook.com/janesmith",
//     categories: [],
//     projects: [],
//     personal_projects: [],
//   },
// ];

 const TeamPage = async () => {

    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = await axios.get("https://main.hivetech.space/api/teams", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const teams = response.data.data;
    console.log( teams);

  return (
    <div className="max-lg:pt-32 lg:pt-32 overflow-hidden">
      <section className="flex flex-col gap-y-16 xs:gap-y-24 lg:flex-row items-center min-h-[40vh]  px-10 lg:px-32">
     
        <div
          className="lg:w-1/2"
        >
        <Animate x="0" y="100" delay={0.8} duration={1.3} index={1} className="text-3xl md:text-4xl xl:text-5xl tracking-widest font-bold max-lg:text-center leading-tight mb-6">
            Our Team
          </Animate>
          <Animate
          x="0" y="150" delay={1} duration={1.3} index={1}
            className=" text-xl max-lg:text-center text-gray-400"
          >
            Our team is full of passionate people and ready to make your dream
            software come true.
          </Animate>
        </div>

        <Animate
          y= "-200" x={ "300"} delay={0.5} duration={2.4} opacity={0} index={1}
  
          className="flex w-full justify-center items-center order-first  lg:order-last lg:w-1/2"
        >
          <Image
            src={Team}
            alt="Build Website"
            width={500}
            height={500}
            className=""
          />
        </Animate>
      </section>

       <section className="sm:mx-auto px-4 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10">
          {teams.map((item: Teams , index: number) => (
            <Animate
            x="-100%" y="0" delay={0.4} duration={2} key={item.id} index={index}
             
              className="w-full max-w-[400px] mx-auto" 
            >
              <Link href={`/teams/${item.code}`} className="flex cursor-pointer flex-col p-4 rounded-2xl dark:bg-darkMod-600 shadow-2xl  justify-center items-center transform transition duration-500 hover:scale-105">
                  <Image
                    src={`https://main.hivetech.space/storage/${item.image}`}
                    alt="Team Member"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                <div className="mt-5 flex flex-col items-center justify-center gap-3">
                 <h2 className="text-lg sm:text-2xl  text-center">
                  {item.name}
                </h2>
                <p className="text-[16px] sm:text-lg text-gray-500 dark:text-gray-300 text-center">{item.position}</p> 
                </div>
              </Link>
            </Animate>
          ))}
        </div>
      </section> 

    </div>
  );
}


export default async function Page() {

  return (
    <Suspense fallback={<Loader />}>
      <TeamPage  />
    </Suspense>
  );
}
