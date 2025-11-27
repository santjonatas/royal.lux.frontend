import InputDefault from "../InputDefault/InputDefault";
import DefaultIconImage from "../../../assets/images/icons/icone-question-violet.png"
import "./InputRegister.css";

interface InputRegisterProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;

    img: string;
    label: string;
    alt: string;

    id?: string;
}

export default function InputRegister({
  value = "",
  onChange = () => {},
  placeholder,
  type = "text",
  name = "",
  required = false,
  disabled = false,
  img = DefaultIconImage,
  alt = "Descrição da imagem",
  label = "Nome do campo",
  id = ""
  }: InputRegisterProps) {
  return (
    <div id='div-input-register'>
      <label htmlFor="" id="label-input-register">
        <img src={img} alt={alt} id="img-input-register"/>
        <h3 id="name-field-register">{label}</h3>
      </label>
      <div id="div-input">
        <InputDefault
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        >
      </InputDefault>
      </div>
    </div>
  );
}