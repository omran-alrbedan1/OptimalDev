import Slider from '@/components/Slider'
import axios from 'axios';
import React from 'react'

const Sliders = async () => {
    const response = await axios.get('https://main.hivetech.space/api/sliders', {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const sliders =response.data.data;
  return (
    <div className=" mb-20 min-h-screen">
 
      <Slider sliders={sliders} />
    </div>
  )
}

export default Sliders