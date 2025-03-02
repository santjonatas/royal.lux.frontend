// import ButtonBell from '../../components/buttons/ButtonBell/ButtonBell';
// import ButtonMenu from '../../components/buttons/ButtonMenu/ButtonMenu';
// import InputSearch from '../../components/inputs/InputSearch/InputSearch';
// import './Header.css'

// export default function Header(){
    
//     return(
//         <header id="header-component">
//             <ButtonMenu></ButtonMenu>
//             <InputSearch></InputSearch>
//             <ButtonBell></ButtonBell>
//         </header>
//     );
// }
import ButtonBell from '../../components/buttons/ButtonBell/ButtonBell';
import ButtonMenu from '../../components/buttons/ButtonMenu/ButtonMenu';
import InputSearch from '../../components/inputs/InputSearch/InputSearch';
import './Header.css';

interface HeaderProps {
    toggleSidebar: () => void; // Definimos explicitamente que a função não recebe argumentos e não retorna nada
}

export default function Header({ toggleSidebar }: HeaderProps) {
    return (
        <header id="header-component">
            <ButtonMenu onClick={toggleSidebar} />
            <InputSearch />
            <ButtonBell />
        </header>
    );
}
