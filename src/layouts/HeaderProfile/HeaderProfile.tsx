import ButtonBack from '../../components/buttons/ButtonBack/ButtonBack';
import ButtonBell from '../../components/buttons/ButtonBell/ButtonBell';
import ButtonLogout from '../../components/buttons/ButtonLogout/ButtonLogout';
import './HeaderProfile.css';

export default function HeaderProfile() {
    return (
        <header id="header-profile-component">
            <ButtonBack></ButtonBack>
            <ButtonBell></ButtonBell>
            <ButtonLogout></ButtonLogout>
        </header>
    );
}
