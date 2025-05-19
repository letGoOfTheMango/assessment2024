interface HeaderDescriptionTextFieldProps {
  text: string;
  id?: string; // für den fall dass man sonst noch irgendwas damit machen will
}
const HeaderDescriptionTextField: React.FC<HeaderDescriptionTextFieldProps> = ({text, id}) => {
  return <input type="text" id={id} value={text} disabled className="w-max"/>;
};
export default HeaderDescriptionTextField;