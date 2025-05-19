export interface Project {
  id: string;
  name: string;
  projektleiter: string;
  beschreibung: string;
  modifiedAt: string;
  modifiedBy: string;
};

export interface Category {
  id: string;
  name: string;
}

export interface Deposit {
  id: string;
  designation: string;
  category: Category;
  date: string;
  sponsor: string;
  amount: number;
  notes?: string;
  projectId: string;
}

interface AppDataInterface {
  currentProject: Project;
}
export default AppDataInterface;
