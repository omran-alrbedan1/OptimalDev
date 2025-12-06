"use client";
import { useRouter } from "next/navigation";
import Slider from "../Slider";

const LatestJobsCarousel = (jobs: any) => {
  const router = useRouter();
  const featuredJobs = jobs.jobs;

  const sliderData = featuredJobs.map((job: any) => ({
    image: job.image,
    link_url: `/career/${job.id}`,
  }));

  return (
    <div className="my-16 md:my-20 h-[150px] md:h-[550px] w-full ">
      <div className="relative h-full w-full">
        <Slider sliders={sliderData} />
      </div>
    </div>
  );
};

export default LatestJobsCarousel;
