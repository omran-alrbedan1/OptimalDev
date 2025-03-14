

import Header from "@/components/Header";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import axios from 'axios';

const Clients = async () => {
  const response = await axios.get('https://main.hivetech.space/api/clients', {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const clients = response.data.data; // Assuming the array is nested under `data`
  console.log(clients); // Verify the structure
  return (
    <div className=" rounded-md flex flex-col antialiased  items-center justify-center relative py-5 my-6 sm:py-20 sm:my-10 overflow-hidden">
    <Header 
  title="Clients" 
  paragragh="Empowering businesses through trusted partnerships and innovative solutions." 
/>
      <InfiniteMovingCards
        items={clients} // Pass the array
        direction="right"
        speed="normal"
      />
    </div>
  );
}
export default Clients;