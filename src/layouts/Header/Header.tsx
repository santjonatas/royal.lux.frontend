import ButtonBell from '../../components/buttons/ButtonBell/ButtonBell';
import ButtonMenu from '../../components/buttons/ButtonMenu/ButtonMenu';
import InputSearch from '../../components/inputs/InputSearch/InputSearch';
import './Header.css'

export default function Header(){
    
    return(
        <header id="header-component">
            <ButtonMenu></ButtonMenu>
            <InputSearch></InputSearch>
            <ButtonBell></ButtonBell>
        </header>
    );
}