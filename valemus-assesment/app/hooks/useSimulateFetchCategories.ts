import { useState, useEffect } from "react";
import categoryData from "@/kategorien.json";

type Category = {
  id: string;
  name: string;
};

export const useSimulateFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string>("");
  
  useEffect(() => {

    const fetchCategories = async () => {

      try {
        setCategoriesLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setCategories(categoryData.sort((a, b) => a.name.localeCompare(b.name)));

        setCategoriesLoading(false);

      } catch (err) {

        setCategoriesError("Failed to fetch projects");
        
        setCategoriesLoading(false);
      }
    };
    
    fetchCategories();
    
  }, []);

  console.log(" useSimulateFetchCategories categories", categories)
  return { categories, categoriesLoading, categoriesError };
};