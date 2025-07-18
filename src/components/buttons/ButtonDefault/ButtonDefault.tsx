import './ButtonDefault.css';

interface ButtonDefaultProps {
  innerText: string;
  disabled?: boolean;
  onClick?: () => void; 
  type?: 'button' | 'submit' | 'reset'; 
}

export default function ButtonDefault({ 
  innerText, 
  disabled = false, 
  onClick,
  type = 'button' 
}: ButtonDefaultProps) {
  return (
    <button 
      type={type}
      id="button-default"
      disabled={disabled}
      onClick={onClick} 
    >
      {innerText}
    </button>
  );
}