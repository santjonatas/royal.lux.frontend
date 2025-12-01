import DefaultIconImage from "../../../assets/images/icons/icone-question-violet.png"
import "./TextAreaRegister.css";
import TextArea from "../TextArea/TextArea";

interface TextAreaRegisterProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;

    img: string;
    label: string;
    alt: string;

    id?: string;
}

export default function TextAreaRegister({
  value = "",
  onChange = () => {},
  placeholder,
  name = "",
  required = false,
  disabled = false,
  readOnly = false,
  rows = 5,
  img = DefaultIconImage,
  alt = "Descrição da imagem",
  label = "Nome do campo",
  id = ""
}: TextAreaRegisterProps) {
  return (
    <div id='div-input-register'>
      <label htmlFor={id} id="label-input-register">
        <img src={img} alt={alt} id="img-input-register"/>
        <h3 id="name-field-register">{label}</h3>
      </label>
      <div id="div-input">
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
        />
      </div>
    </div>
  );
}