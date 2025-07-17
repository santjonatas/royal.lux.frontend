import './Sidebar.css';
import ButtonProfile from '../../features/ButtonsSidebar/ButtonProfile/ButtonProfile';
import ButtonSidebarDefault from '../../features/ButtonsSidebar/ButtonSidebarDefault/ButtonSidebarDefault';

import imageHome from "../../assets/images/icons/home.png";
import imageUsers from "../../assets/images/icons/users.png";
import imageBadges from "../../assets/images/icons/badge.png";
import imageHands from "../../assets/images/icons/hands.png";
import imageTools from "../../assets/images/icons/tool.png";
import imageScissors from "../../assets/images/icons/scissors.png";

type SidebarProps = {
    setCurrentPage: (page: string) => void;
};

export default function Sidebar({ setCurrentPage }: SidebarProps) {
    return (
        <aside id="sidebar-component">
            <article id="img-royal-lux"></article>
            <ButtonProfile />

            <ButtonSidebarDefault
                name="Dashboard"
                pathImage={imageHome}
                onClick={() => setCurrentPage("home")}
            />

            <ButtonSidebarDefault
                name="Usuários"
                pathImage={imageUsers}
                onClick={() => setCurrentPage("users")}
            />

            <ButtonSidebarDefault
                name="Funções"
                pathImage={imageBadges}
                onClick={() => setCurrentPage("roles")}
            />

            <ButtonSidebarDefault
                name="Atendimentos"
                pathImage={imageHands}
                onClick={() => setCurrentPage("appointments")}
            />

            <ButtonSidebarDefault
                name="Serviços"
                pathImage={imageTools}
                onClick={() => setCurrentPage("services")}
            />

            <ButtonSidebarDefault
                name="Materiais"
                pathImage={imageScissors}
                onClick={() => setCurrentPage("materials")}
            />
        </aside>
    );
}
