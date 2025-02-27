import './InputDefault.css'

interface InputDefaultProps{
    placeholder: string;
    type?: string;
    name?: string;
    required?: boolean;
}

export default function({placeholder, type = "text", name = "", required = false}: InputDefaultProps){

    return (
        <input type={type} className="input-form" name={name} placeholder={placeholder} required={required}/>
    );
}