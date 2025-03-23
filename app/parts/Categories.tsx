
import CategoryCard from "@/components/cards/CategoryCard";

import Header from "@/components/Header";
import { Category } from "@/types";
import axios from "axios";



const Categories = async () => {

    const response = await axios.get('https://main.hivetech.space/api/category', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const categories = response.data.data; // Assuming the array is nested under `data`



  return (
    <section className="px-5 md:px-10 lg:px-20 flex flex-col items-center mt-12 md:mt-20 ">
    
    <Header title='Categories' className="pb-10" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 min-w-full ">
    {categories.map((category: Category, index: number) => (
      <CategoryCard key={category.id} category={category} index={index} />
    ))}
    </div>
      </section>
  );
};

export default Categories;