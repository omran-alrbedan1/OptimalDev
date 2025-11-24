import Slider from "@/components/Slider";
import React from "react";

const Sliders = async ({ sliders }: { sliders: Slider[] }) => {
  return (
    <div className=" my-4 md:my-16   h-[150px] md:h-[550px] ">
      <Slider sliders={sliders} />
    </div>
  );
};

export default Sliders;
