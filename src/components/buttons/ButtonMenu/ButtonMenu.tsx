import './ButtonMenu.css';

interface ButtonMenuProps {
    onClick: () => void; 
}

export default function ButtonMenu({ onClick }: ButtonMenuProps) {
    return (
        <button id="button-menu-component" onClick={onClick}></button>
    );
}
