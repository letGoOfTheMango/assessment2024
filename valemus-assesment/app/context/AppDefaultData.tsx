import AppContextInterface from "./AppContextInterface";

const defaultAppData: AppContextInterface = {
  currentProject: {
    id: "",
    name: "",
    projektleiter: "",
    beschreibung: "",
    modifiedAt: "",
    modifiedBy: "",
  },
  // moneyStuff: [],
};
export default defaultAppData;
