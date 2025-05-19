"use client";
import { useSimulateFetchProjects } from "@hooks/useSimulateFetchProjects";
import { useEffect } from "react";
import HeaderDescriptionTextField from "@header/HeaderDescriptionTextField";
import { useAppContext } from "@context/AppContext";
import AppContextInterface from "@context/AppContextInterface";


const ProjectSelector: React.FC = () => {
  const [appData, setAppData] = useAppContext() as [AppContextInterface,React.Dispatch<React.SetStateAction<AppContextInterface>>];
  const { projects, projectsLoading, projectsError } = useSimulateFetchProjects();
  
  useEffect(() => {
    if (projects && projects.length > 0) {
      setAppData((prev: AppContextInterface) => ({
        ...prev,
        currentProject: projects[0]
      }));
    }
  }, [projects, setAppData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => { // * typing
    const selectedProject = projects.find(project => project.name === e.target.value);
    if (selectedProject) {
      setAppData((prev:AppContextInterface)=>({
        ...prev,
        currentProject: selectedProject
      }));
    }
  };
  
  if (projectsLoading) return <p className="text-center">Fake lade Projekte</p>;
  if (projectsError) return <p className="text-center">Error: {projectsError}</p>;
  
  return (
    <div>
      <div className="flex justify-center gap-2 w-full">
        <select
          value={appData.currentProject.name}
          onChange={handleChange}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
        <HeaderDescriptionTextField text={appData.currentProject.projektleiter} /> {/*normal in den header*/}
        <HeaderDescriptionTextField text={appData.currentProject.beschreibung} />
      </div>
    </div>
  );
};

export default ProjectSelector;