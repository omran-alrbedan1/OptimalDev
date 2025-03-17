
import Category from "@/components/Category";
import axios from "axios";



const Categories = async () => {

    const response = await axios.get('https://main.hivetech.space/api/category', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const categories = response.data.data; // Assuming the array is nested under `data`



  return (
  <Category categories={categories}/>
  );
};

export default Categories;