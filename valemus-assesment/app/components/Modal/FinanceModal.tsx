// kein portaling eingebaut weil nur Demo, sonst schon.

import { Deposit } from "@/app/context/AppContextInterface";
import { Category } from "@/app/context/AppContextInterface";
import { formatCurrency } from "@utils/formatCurrency";
import { parseFormattedCurrency } from "@utils/parseFormattedCurrency";
import { formatDate } from "@utils/formatDate";
import { isValidDate } from "@utils/isValidDate";
import { useState, useEffect } from 'react';



interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deposit: Omit<Deposit, 'id'>) => Promise<void>; // * typing
  categories: Category[];
  currentProjectId: string;
  existingDeposit?: Deposit;
}


export default function FinanzierungModal({isOpen, onClose, onSave, categories, currentProjectId,existingDeposit }: FinanceModalProps) {
  const [designation, setDesignation] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [sponsor, setSponsor] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // * typing error
  const [showConfirmClose, setShowConfirmClose] = useState<boolean>(false);

  // init with existing data when editing
  useEffect(() => {
    if (existingDeposit) {
      setDesignation(existingDeposit.designation);
      setCategoryId(existingDeposit.category.id);
      setDate(existingDeposit.date);
      setSponsor(existingDeposit.sponsor);
      setAmount(formatCurrency(existingDeposit.amount));
      setNotes(existingDeposit.notes || "");
    } else {
      // reset fields for new deposit
      setDesignation("");
      setCategoryId("");
      setDate(formatDate(new Date()));
      setSponsor("");
      setAmount("");
      setNotes("");
    }
    // reset
    setErrors({});
    setShowConfirmClose(false);
  }, [isOpen, existingDeposit]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!designation.trim()) {
      newErrors.designation = "Bezeichnung ist erforderlich";
    }
    
    if (!categoryId) {
      newErrors.categoryId = "Kategorie ist erforderlich";
    }
    
    if (!date || !isValidDate(date)) {
      newErrors.date = "Gültiges Datum ist erforderlich (DD.MM.YYYY)";
    }
    
    if (!sponsor.trim()) {
      newErrors.sponsor = "Geldgeber ist erforderlich";
    }
    
    if (!amount.trim()) {
      newErrors.amount = "Betrag ist erforderlich";
    } else {
      const parsedAmount = parseFormattedCurrency(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        newErrors.amount = "Betrag muss größer als 0 sein";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      // Find the selected category object
      const selectedCategory = categories.find(k => k.id === categoryId);
      
      if (!selectedCategory) {
        setErrors({ categoryId: "Ungültige Kategorie ausgewählt" });
        return;
      }

      const parsedAmount = parseFormattedCurrency(amount);
      
      const newDeposit = {
        designation,
        category: selectedCategory,
        date,
        sponsor,
        amount: parsedAmount,
        notes: notes.trim() || undefined,
        projectId: currentProjectId
      };
      
      try {
        await onSave(newDeposit);
        onClose();
      } catch (error) {
        console.error("Error saving Geldeinlage:", error);
        setErrors({ general: "Fehler beim Speichern der Geldeinlage" });
      }
    } else {
      // Show list of invalid fields
      const invalidFields = Object.keys(errors).map(key => {
        switch(key) {
          case "designation": return "Bezeichnung";
          case "categoryId": return "Kategorie";
          case "date": return "Datum";
          case "sponsor": return "Geldgeber";
          case "amount": return "Betrag";
          default: return key;
        }
      });
      
      alert(`Folgende Pflichtfelder sind noch nicht gültig befüllt: ${invalidFields.join(", ")}`);
    }
  };

  const handleCancel = () => {
    // Only show confirmation if any field has been filled in
    if (designation || categoryId || sponsor || amount !== "" || notes) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    onClose();
  };

  const handleBetragChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters except dots and commas
    const value = e.target.value.replace(/[^\d.,]/g, "");
    setAmount(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999">
      <div className="bg-white">
        <h2 className="text-xl font-bold">
          {existingDeposit ? "Finanzierung bearbeiten" : "Neue Geldeinlage erfassen"}
        </h2>
        
        {showConfirmClose ? (
          <div>
            <p>Möchten Sie die Erfassung wirklich verwerfen?</p>
            <div className="flex gap-4">
              <button 
                onClick={handleConfirmClose}
                className="bg-red-500 text-white px-4"
              >
                Ja, verwerfen
              </button>
              <button 
                onClick={() => setShowConfirmClose(false)}
                className="bg-gray-300 px-4"
              >
                Nein, zurück
              </button>
            </div>
          </div>
        ) : (
          <div>
            {errors.general && (
              <div className="bg-red-100 text-red-700">
                {errors.general}
              </div>
            )}
            
            <div>
              <label className="block">
                Bezeichnung der Geldeinlage*
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className={`w-full border ${
                  errors.designation ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.designation && (
                <p className="text-red-500 text-sm">{errors.designation}</p>
              )}
            </div>
            
            <div>
              <label className="block">
                Kategorie*
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`w-full border ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">-- Bitte wählen --</option>
                {categories.map((kategorie) => (
                  <option key={kategorie.id} value={kategorie.id}>
                    {kategorie.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId}</p>
              )}
            </div>
            
            <div>
              <label className="block">
                Datum*
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD.MM.YYYY"
                className={`w-full border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            
            <div>
              <label className="block">
                Geldgeber*
              </label>
              <input
                type="text"
                value={sponsor}
                onChange={(e) => setSponsor(e.target.value)}
                className={`w-full border ${
                  errors.sponsor ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.sponsor && (
                <p className="text-red-500 text-sm">{errors.sponsor}</p>
              )}
            </div>
            
            <div>
              <label className="block">
                Betrag*
              </label>
              <input
                type="text"
                value={amount}
                onChange={handleBetragChange}
                placeholder="0,00"
                className={`w-full border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>
            
            <div>
              <label className="block">
                Notizen
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300"
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-700 text-white"
              >
                Speichern
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}