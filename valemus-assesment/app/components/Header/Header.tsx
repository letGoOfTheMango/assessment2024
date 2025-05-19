import ProjectsSelector from "@header/ProjectSelector";
import HeaderDescriptionTextField from "@header/HeaderDescriptionTextField";


const Header: React.FC = () => {
  return (
    <header>
      <div className="text-center">
        <span className="text-5xl">Valemus Assessment</span>
      </div>
      <div className="mt-5 bg-[#95bad4] flex justify-center">
        <ProjectsSelector />
      </div>
    </header>
  );
};
export default Header;
