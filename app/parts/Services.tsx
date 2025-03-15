import Service from "@/components/Service";
import axios from "axios";


export default async function Services() {
  const response = await axios.get('https://main.hivetech.space/api/services', {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const services =response.data.data.slice(0, 6);

  return (
   <Service services={services}/>
  );
}
