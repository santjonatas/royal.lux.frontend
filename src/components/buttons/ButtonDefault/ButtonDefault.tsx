import './ButtonDefault.css'

interface ButtonDefaultProps{
    innerText: string;
}

export default function({ innerText }: ButtonDefaultProps){
    return (
        <button type="submit" id="button-login">{innerText}</button>
    );
}