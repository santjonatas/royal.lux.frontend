import './ButtonDefault.css';

interface ButtonDefaultProps {
    innerText: string;
    disabled?: boolean;  
}

export default function ButtonDefault({ innerText, disabled = false }: ButtonDefaultProps) {
    return (
        <button 
            type="submit" 
            id="button-login"
            disabled={disabled}  
        >
            {innerText}
        </button>
    );
}