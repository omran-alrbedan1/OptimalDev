"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

interface PersonalProjectsProps {
  id: number;
  title: string;
  team_id: number;
  repository_link: string;
}

interface Metadata {
  title?: string;
  description?: string;
  image?: { url?: string };
}

const PersonalProjects = ({
  personal_projects,
}: {
  personal_projects: PersonalProjectsProps[];
}) => {
  const [metadataMap, setMetadataMap] = useState<Record<number, Metadata>>({});

  useEffect(() => {
    const fetchAllMetadata = async () => {
      const newMetadataMap: Record<number, Metadata> = {};
      for (const project of personal_projects) {
        const metadata = await fetchMetadata(project.repository_link);
        newMetadataMap[project.id] = metadata || {};
      }
      console.log(newMetadataMap);
      setMetadataMap(newMetadataMap);
    };

    fetchAllMetadata();
  }, [personal_projects]);

  const fetchMetadata = async (url: string) => {
    try {
      const response = await axios.get(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`
      );
      return response.data.data;
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl pb-20 transition-all duration-300 px-6 sm:px-10 overflow-hidden">
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          type: "spring",
          ease: "easeOut",
          once: true,
        }}
      >
        <h2 className="font-black md:text-[30px] sm:text-[27px] text-[22px] mb-8">
          Personal Projects
        </h2>
      </motion.div>

      {/* Map through projects */}
      <div className="flex flex-wrap gap-8 ">
        {personal_projects.map((project) => {
          const metadata = metadataMap[project.id];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: "easeOut",
                type: "spring",
                once: true,
              }}
            >
              <a
                href={project.repository_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block  dark:border-gray-200 border-gray-500 border-[2px] dark:border-[1px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                {metadata ? (
                  <div className="p-5 rounded-lg  bg-gray-800 shadow-sm ">
                    {metadata.image?.url && (
                      <img
                        src={metadata.image.url}
                        alt={metadata.title}
                        width={370}
                        height={300}
                        className=" object-fill mb-10"
                      />
                    )}
                    <h4 className="font-medium text-lg text-white mb-1">
                      {metadata.title}
                    </h4>
                    <p className="text-sm  text-gray-400">
                      {metadata.description}
                    </p>
                  </div>
                ) : (
                  <p className="p-5">Loading metadata...</p>
                )}
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalProjects;
