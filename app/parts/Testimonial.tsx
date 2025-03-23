import Testimonials from "@/components/Testimonials";
import axios from "axios";


export default async function Testimonial() {

  const response = await axios.get('https://main.hivetech.space/api/testimonials', {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const testimonials = response.data.data; // Assuming the array is nested under `data`
  console.log(testimonials); // Verify the structure
  return (<div className=" mt-8 sm:mt-40">

    <Testimonials testimonials={testimonials}/>
  </div>
  );
}
