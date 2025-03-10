"use client";
import { Service } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const Services: Service[] = [
    {
      id: 1,
      title: "Web Development",
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
      title: "Mobile Development",
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
      title: "UI/UX Design",
      subtitle: "",
      description: "",
      content: "",
      image: "projects/images/01JMSJ49FK1S5RDAWQZGA3KYM2.jpg",
      project_link: null,
      demo_link: null,
      views: 0,
      likes: 0,
    },
  ];

  return (
    <section className="container mx-auto flex flex-col items-center mt-20 bg-gray-100 py-10 px-3">
      {/* Animated Heading */}
      <motion.h1
        className="text-5xl text-primary-color1 text-center font-extrabold"
        initial={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "linear" }}
        // viewport={{ once: true }}
      >
        Our Services
      </motion.h1>

      <motion.p
        className="text-lg text-gray-400 text-center mt-4 mb-12 mx-auto"
        initial={{ opacity: 0, y: 20, x: "-100%" }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, ease: "linear" }}
        // viewport={{ once: true }}
      >
        We are ready to scale up your business with our great service.
      </motion.p>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {Services.map((item, index) => {
          // Define custom animations based on the index
          // const animations = {
          //   initial: {},
          //   whileInView: {},
          // };

          // if (index === 0) {
          //   animations.initial = { opacity: 0, x: "-100%" };
          //   animations.whileInView = { opacity: 1, x: 0 };
          // } else if (index === 1) {
          //   animations.initial = { opacity: 0, y: 200 };
          //   animations.whileInView = { opacity: 1, y: 0 };
          // } else if (index === 2) {
          //   animations.initial = { opacity: 0, x: "100%" };
          //   animations.whileInView = { opacity: 1, x: 0 };
          // }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale:"90%" }}
              whileInView={{ opacity: 1, y: 0, scale: "100%" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="group rounded-2xl shadow-xl w-11/12 m-3 transform transition duration-500 hover:scale-105">
                <Link href={`/project/${item.id}`} passHref>
                  <div className="relative cursor-pointer">
                    <Image
                      src={`https://main.hivetech.space/storage/${item.image}`}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="rounded-t-2xl z-0 bg-contain h-80"
                    />
                  </div>
                </Link>
                <div className="py-7 text-center">
                  <h2 className="text-[#152C5B] text-xl font-semibold">
                    {item.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
