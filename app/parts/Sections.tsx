
import Section from "@/components/Section";
import axios from "axios";



const Sections = async () => {

    const response = await axios.get('https://main.hivetech.space/api/sections', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const sections = response.data.data;
    console.log(sections) // Assuming the array is nested under `data`



  return (
  <Section sections={sections}/>
  );
};

export default Sections;