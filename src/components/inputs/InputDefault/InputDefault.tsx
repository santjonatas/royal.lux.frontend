import "./InputDefault.css";

interface InputDefaultProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  pattern?: string;
}

export default function InputDefault({
  value = "",
  onChange = () => {},
  placeholder,
  type = "text",
  name = "",
  required = false,
  disabled = false,
  readOnly = false,
  id = "",
  inputMode,
  pattern
  }: InputDefaultProps) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      className="input-form"
      name={name}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      inputMode={inputMode}
      pattern={pattern}
    />
  );
}

