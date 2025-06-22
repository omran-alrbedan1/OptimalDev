import Slider from "@/components/Slider";
import React from "react";

const Sliders = async () => {
  const sliders = [
    {
      id: 1,
      title: "Optimal Path - Recruitment & Careers",
      description:
        "Discover top career opportunities with Optimal Path, specializing in employment and professional development",
      backgroundImage: "/images/section.jpg",
      url: "/jobs",
    },
    {
      id: 2,
      title: "Your Ideal Workspace",
      description:
        "Join a professional team in a stimulating work environment equipped with the latest technologies",
      backgroundImage: "/images/work-space.jpg",
      url: "/careers",
    },
    {
      id: 3,
      title: "About Optimal Path",
      description:
        "Learn about our mission to connect talent with the right opportunities in the job market",
      backgroundImage: "/images/about-us.jpg",
      url: "/about",
    },
    {
      id: 4,
      title: "Career Development Programs",
      description:
        "Explore our training and development programs to enhance your professional skills",
      backgroundImage: "/images/work-space.jpg",
      url: "/programs",
    },
  ];

  return (
    <div className="mb-20 h-[80vh]">
      <Slider sliders={sliders} />
    </div>
  );
};

export default Sliders;
