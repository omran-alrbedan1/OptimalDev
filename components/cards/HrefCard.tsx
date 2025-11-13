"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

interface Metadata {
  title?: string;
  description?: string;
  image?: { url?: string };
}

const HrefCard = ({ url }: { url: string }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.microlink.io?url=${encodeURIComponent(url)}`
        );
        setMetadata(response.data.data);
      } catch (err) {
        console.error("Error fetching metadata:", err);
        setError("Failed to load project metadata");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchMetadata();
    }
  }, [url]);

  if (!url) return <div>No URL provided</div>;

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
      <h2 className="font-bold md:text-[30px] sm:text-[27px] text-[22px] mb-8">
        See Our Project Online
      </h2>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.4,
        ease: "easeOut",
        type: "spring",
        once: true,
      }}
      className="w-full max-w-[400px]"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block dark:border-gray-200 border-gray-500 border-[2px] dark:border-[1px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      >
        {loading ? (
          <div className="p-5 bg-gray-800 h-full min-h-[200px] flex items-center justify-center">
            <p>Loading metadata...</p>
          </div>
        ) : error ? (
          <div className="p-5 bg-gray-800 h-full min-h-[200px] flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : metadata ? (
          <div className="p-5 rounded-lg bg-gray-800 shadow-sm h-full">
            {metadata.image?.url ? (
              <img
                src={metadata.image.url}
                alt={metadata.title || "Project image"}
                width={370}
                height={300}
                className="object-fill mb-4 rounded-lg"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-700 mb-4 rounded-lg flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
            <h4 className="font-medium text-lg text-white mb-1">
              {metadata.title || "Untitled Project"}
            </h4>
            <p className="text-sm text-gray-400">
              {metadata.description || "No description available"}
            </p>
          </div>
        ) : null}
      </a>
    </motion.div>
    </div>
  );
};

export default HrefCard;