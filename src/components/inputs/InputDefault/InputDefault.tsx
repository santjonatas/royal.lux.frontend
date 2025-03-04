import "./InputDefault.css";

interface InputDefaultProps {
  value?: string; // Agora é opcional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Opcional também
  placeholder: string;
  type?: string;
  name?: string;
  required?: boolean;
}

export default function InputDefault({
  value = "", // Valor padrão para evitar erro
  onChange = () => {}, // Função padrão para evitar erro
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
