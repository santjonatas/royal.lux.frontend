
// import './ButtonMenu.css'

// export default function ButtonMenu(){

//     return(
//         <button id="button-menu-component"></button>
//     );
// }
import './ButtonMenu.css';

interface ButtonMenuProps {
    onClick: () => void; // Garante que a função passada seja válida
}

export default function ButtonMenu({ onClick }: ButtonMenuProps) {
    return (
        <button id="button-menu-component" onClick={onClick}></button>
    );
}
