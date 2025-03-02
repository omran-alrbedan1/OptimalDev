"use client";
import { Project } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Pinkey App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSHK0HZTP2YQR8XTPQZ5M7D.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 2,
      title: "CarConsultant App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSHX71XBY1EADX3QABPAMKS.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 1,
      title: "Pinkey App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSHK0HZTP2YQR8XTPQZ5M7D.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 2,
      title: "CarConsultant App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSHX71XBY1EADX3QABPAMKS.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 3,
      title: "Labor App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJ49FK1S5RDAWQZGA3KYM2.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 4,
      title: "Soon App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJ7NNAT8FSXTJGR5G6TWFY.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 5,
      title: "ِAtharna App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJB4BGNNHHTJX6550S5202.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 6,
      title: "Orderbook App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJEN125ZP5Y9GSH19P38GZ.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 7,
      title: "Ehtooa App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJHTRQWFXM4Q8TDRATJFFE.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 8,
      title: "Mosanad App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJMFRAER1DDM82MCVSYJ2G.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    {
      id: 9,
      title: " MY CURRENCY App",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJR1HKY6YY0BQJF60714GN.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
    // Add more projects as needed
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="container mx-auto flex flex-col items-center mt-20"
    >
      <motion.h1
        className="text-4xl text-primary-color1 text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Selected Projects
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-400 text-center mt-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        We are ready to scale up your business with our great work result.
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
        {projects.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="group rounded-2xl shadow-xl w-11/12 m-3 transform transition duration-500 hover:scale-105"
          >
            <Link href={`/project/${item.id}`} passHref>
              <div className="relative cursor-pointer">
                <Image
                  src={`https://main.hivetech.space/storage/${item.image}`}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="rounded-t-2xl z-0"
                />
              </div>
            </Link>
            <div className="py-4 text-center">
              <h2 className="text-theme-blue text-xl">{item.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
