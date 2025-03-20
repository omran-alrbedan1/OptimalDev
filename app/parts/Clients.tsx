





import Header from '@/components/Header';
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import axios from 'axios';
import React from 'react'

const Clients = async () => {
  const response = await axios.get('https://main.hivetech.space/api/clients', {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const clients = response.data.data; // Assuming the array is nested under `data`
  console.log(clients); // Verify the structure
  return (

    <div className=" rounded-md flex flex-col pb-10 antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Header 
   title="Clients" 
  paragragh="Empowering businesses through trusted partnerships and innovative solutions." 
 />
      <InfiniteMovingCards
        items={clients}
        direction="right"
        speed="fast"
      />
    </div>
  );
}
 



export default Clients