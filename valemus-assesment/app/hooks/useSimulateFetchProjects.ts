import { useState, useEffect } from "react";
import projectsData from '@/projekte.json';
import { Project } from "@context/AppContextInterface";

export const useSimulateFetchProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
  const [projectsError, setProjectsError] = useState<string>("");
  
  useEffect(() => {

    const fetchProjects = async () => {

      try {
        setProjectsLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setProjects(projectsData.sort((a, b) => a.name.localeCompare(b.name)));

        setProjectsLoading(false);

      } catch (err) {

        setProjectsError("Failed to fetch projects");
        
        setProjectsLoading(false);
      }
    };
    
    fetchProjects();
    
  }, []);

  console.log(" useSimulateFetchProjects projects", projects)
  return { projects, projectsLoading, projectsError };
};