import Slider from "@/components/Slider";
import axios from "axios";
import React from "react";

const Sliders = async () => {
  const sliders = [
    {
      id: 1,
      title: "Find Your Dream Job Today",
      description:
        "Browse thousands of job listings from top companies and find the perfect match for your skills and aspirations.",
      first_btn_text: "Search Jobs",
      first_btn_url: "/",
      second_btn_text: "Upload CV",
      second_btn_url: "/",
      backgroundImage: "/images/section.jpg",
    },
    {
      id: 2,
      title: "Hiring Top Talent Made Easy",
      description:
        "For employers: Post jobs, find qualified candidates, and streamline your hiring process with our powerful tools.",
      first_btn_text: "Post a Job",
      first_btn_url: "/",
      second_btn_text: "Learn More",
      second_btn_url: "/",
      backgroundImage: "/images/work-space.jpg",
    },
    {
      id: 3,
      title: "Explore Remote Opportunities",
      description:
        "Discover flexible and remote positions that let you work from anywhere in the world.",
      first_btn_text: "Remote Jobs",
      first_btn_url: "/",
      second_btn_text: "Career Advice",
      second_btn_url: "/",
      backgroundImage: "/images/about-us.jpg",
    },
    {
      id: 4,
      title: "Join Our Career Fair",
      description:
        "Connect directly with recruiters from leading companies at our virtual career fair event.",
      first_btn_text: "Register Now",
      first_btn_url: "/",
      second_btn_text: "See Participating Companies",
      second_btn_url: "/",
      backgroundImage: "/images/work-space.jpg",
    },
  ];
  return (
    <div className=" mb-20 h-[80vh]">
      <Slider sliders={sliders} />
    </div>
  );
};

export default Sliders;
