"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Next.js optimized image component
import Team from "../../../public/assets/team.png";
import ProfileDefault from "../../../public/assets/profile.png";
const teams = [
  {
    id: 1,
    name: "Ahmad Mriwed",
    bio: "Expert software engineer.",
    image: "team1.jpg",
    code: "ahmad_mriwed",
    cv: "cv_john_doe.pdf",
    position: "Project Manager",
    whatsapp: null,
    content: null,
    phone: "+963937954969",
    email: "mr.ahmadmirwed@gmail.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 9,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 8,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 7,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 2,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 6,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 5,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 4,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 10,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
  // Add more team members here as needed
  {
    id: 3,
    name: "Jane Smith",
    bio: "UI/UX Designer.",
    image: "team2.jpg",
    code: "jane_smith",
    cv: "cv_jane_smith.pdf",
    position: "Design Lead",
    whatsapp: null,
    content: null,
    phone: "+1234567890",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    facebook: "https://facebook.com/janesmith",
    categories: [],
    projects: [],
    personal_projects: [],
  },
];

export default function TeamPage() {
  return (
    <div className="max-lg:pt-32 lg:pt-5">
      <section className="flex flex-col gap-y-16 xs:gap-y-24 lg:flex-row items-center h-[74vh] px-10 lg:px-32">
        {/* Fade effect with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
          animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
          transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
          className="lg:w-1/2"
        >
          <h1 className="text-3xl md:text-4xl xl:text-5xl tracking-widest font-bold max-lg:text-center leading-tight mb-6">
            Our Team
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
            animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }} // Animation duration and easing
            className=" text-xl max-lg:text-center text-gray-400"
          >
            Our team is full of passionate people and ready to make your dream
            software come true.
          </motion.p>
        </motion.div>

        {/* Fade effect for the image */}
        <motion.div
          initial={{ opacity: 0, y: -400, x: "100%" }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex pt-5 w-full justify-center items-center order-first md:w-full lg:order-last lg:w-1/2"
        >
          <Image
            src={Team}
            alt="Build Website"
            width={600}
            height={600}
            className=""
          />
        </motion.div>
      </section>

      <section className="sm:mx-auto mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-4 min-w-0 mx-5 sm:ml-12">
          {teams.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              // viewport={{ once: true }}
              className="w-full" // Ensure grid items take full width
            >
              <div className="flex flex-col px-4 h-60 sm:w-56 sm:h-72 py-20 rounded-xl shadow-xl border border-light-theme-purple justify-center transform transition duration-500 hover:scale-105">
                <div className="flex justify-center xl:mb-5 mb-3">
                  <Image
                    src={ProfileDefault}
                    alt="Team Member"
                    width={128}
                    height={128}
                    className="flex w-32 h-32 rounded-full"
                  />
                </div>
                <h2 className="text-lg sm:text-2xl text-theme-blue text-center text-[#152C5B]">
                  {item.name}
                </h2>
                <p className="text-[15px] sm:text-lg text-gray-400 text-center">{item.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
