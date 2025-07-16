import "./InputDefault.css";

interface InputDefaultProps {
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder: string;
  type?: string;
  name?: string;
  required?: boolean;
}

export default function InputDefault({
  value = "",
  onChange = () => {}, 
  placeholder,
  type = "text",
  name = "",
  required = false,
  }: InputDefaultProps) {
    return (
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="input-form"
        name={name}
        placeholder={placeholder}
        required={required}
      />
    );
}
