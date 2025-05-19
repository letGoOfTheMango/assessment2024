interface TabButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ text, active, onClick }) => {
  return (
    <button
      role="tab"
      onClick={onClick}
      className={`cursor-pointer ${active ? "bg-[#95bad4] text-white" : ""}`}
      aria-selected={active}
    >
      {text}
    </button>
  );
};
export default TabButton;
