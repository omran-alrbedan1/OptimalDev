import Project from "@/components/Project";
import axios from "axios";


export default async function Projects() {


    const response = await axios.get('https://main.hivetech.space/api/projects', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const projects = response.data.data.slice(0, 6); // Assuming the array is nested under `data`
    // console.log(testimonials); // Verify the structure


  return (
    <Project projects={projects} />
  )
 
}