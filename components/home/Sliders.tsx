import Slider from "@/components/Slider";
import React from "react";

const Sliders = async ({ sliders }: { sliders: Slider[] }) => {
  return (
    <div className="my-20 md:my-24  md:w-[1500px]   h-[150px] md:h-[550px] ">
      <Slider sliders={sliders} />
    </div>
  );
};

export default Sliders;
