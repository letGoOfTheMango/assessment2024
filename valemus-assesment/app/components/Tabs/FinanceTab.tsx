import { useState, useEffect } from "react";
import FinanceModal from "@modal";
import { useSimulateFetchCategories } from "@hooks/useSimulateFetchCategories";
import { useSimulateFetchProjects } from "@hooks/useSimulateFetchProjects";
import { useAppContext } from "@context/AppContext";
import AppContextInterface from "@context/AppContextInterface";
import { Category } from "@context/AppContextInterface";
import { createId } from "@utils/createId";
import { formatCurrency } from "@utils/formatCurrency";



interface Deposit {
  id: string;
  designation: string;
  category: Category;
  date: string;
  sponsor: string;
  amount: number;
  notes?: string;
  projectId: string;
}

const FinanceTab:React.FC = () => {
  const [appData, setAppData] = useAppContext() as [AppContextInterface,React.Dispatch<React.SetStateAction<AppContextInterface>>];
  const {categories, categoriesLoading, categoriesError } = useSimulateFetchCategories(); // loadings and error not implemented because test project
  // const {projects, projectsLoading, projectsError } = useSimulateFetchProjects(); // loadings and error not implemented because test project
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(""); // get from context
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingDeposit, setEditingDeposit] = useState<Deposit | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // fake load data from local
  useEffect(() => {
    const fakeFetchData = async () => {

      await new Promise(resolve => setTimeout(resolve, 600));

      try {
        setIsLoading(true);
        
        const savedDeposits = localStorage.getItem("deposits");

        if (savedDeposits) {

          setDeposits(JSON.parse(savedDeposits));

        }

      } catch (error) {

        console.error("Error fetching data:", error);

      } finally {

        setIsLoading(false);

      }
  
    };
    
    fakeFetchData();
  }, []);

  // Save geldeinlagen to localStorage whenever they change
  useEffect(() => {
    if (deposits.length > 0) {

      localStorage.setItem("deposits", JSON.stringify(deposits));

    }
  }, [deposits]);

  useEffect(() => {
    setSelectedProjectId(appData.currentProject.id);
  }, [appData.currentProject]);


  // Filter deposits for selected project
  const projectDeposits = deposits.filter(g => g.projectId === selectedProjectId);


  const handleNewDeposit = () => {

    setEditingDeposit(undefined);

    setIsModalOpen(true);

  };

  const handleEditDeposit = (deposit: Deposit) => {

    setEditingDeposit(deposit);

    setIsModalOpen(true);

  };

  // saving deposit
  const handleSaveDeposit = async (depositData: Omit<Deposit, "id">) => {

    // fake async operation
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (editingDeposit) {
      
      const updatedDeposits = deposits.map(g => 
        g.id === editingDeposit.id ? { ...depositData, id: g.id } : g
      );

      setDeposits(updatedDeposits);
    } else {

      // taken from another project of mine
      const newId = createId();

      setDeposits([...deposits, { ...depositData, id: newId }]);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-red">Fake lade Daten...</div>;
  }

  return (
      <div>
        <button
          onClick={handleNewDeposit}
          className="bg-[#95bad4]"
        >
          Neue Geldeinlage erfassen
        </button>
        
        <h2 className="text-xl font-bold mb-4">Erfasste Geldeinlagen</h2>
        
        {projectDeposits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Zeilennummer</th>
                  <th className="py-2 px-4 border-b text-left">Datum</th>
                  <th className="py-2 px-4 border-b text-left">Bezeichnung</th>
                  <th className="py-2 px-4 border-b text-left">Kategorie</th>
                  <th className="py-2 px-4 border-b text-left">Betrag</th>
                  <th className="py-2 px-4 border-b text-left">Geldgeber</th>
                  <th className="py-2 px-4 border-b text-center">Notizen</th>
                  <th className="py-2 px-4 border-b text-center">Öffnen</th>
                </tr>
              </thead>
              <tbody>
                {projectDeposits.map((deposit, index) => (
                  <tr key={deposit.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{deposit.date}</td>
                    <td className="py-2 px-4 border-b">{deposit.designation}</td>
                    <td className="py-2 px-4 border-b">{deposit.category.name}</td>
                    <td className="py-2 px-4 border-b">{formatCurrency(deposit.amount)}</td>
                    <td className="py-2 px-4 border-b">{deposit.sponsor}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {deposit.notes && deposit.notes.trim() && (
                        <div className="relative group">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-gray-500 cursor-help"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                            />
                          </svg>
                          <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg -left-28 -top-2">
                            {deposit.notes}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleEditDeposit(deposit)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                      >
                        Bearbeiten
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 text-center text-gray-500 rounded">
            Keine Geldeinlagen für dieses Projekt vorhanden.
          </div>
        )}
      
      <FinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDeposit}
        categories={categories}
        currentProjectId={selectedProjectId}
        existingDeposit={editingDeposit}
      />
      </div>
  );
}
export default FinanceTab;