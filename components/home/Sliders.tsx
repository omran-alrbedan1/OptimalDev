import Slider from "@/components/Slider";
import React from "react";

const Sliders = async ({ sliders }: { sliders: Slider[] }) => {
  return (
    <div className="mb-20 h-[80vh]">
      <Slider sliders={sliders} />
    </div>
  );
};

export default Sliders;
