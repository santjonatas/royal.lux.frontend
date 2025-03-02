import ButtonProfile from '../../features/ButtonsSidebar/ButtonProfile/ButtonProfile';
import ButtonSidebarDefault from '../../features/ButtonsSidebar/ButtonSidebarDefault/ButtonSidebarDefault';
import './Sidebar.css'
import imageHome from "../../assets/images/icons/home.png"
import imageUsers from "../../assets/images/icons/users.png"
import imageBadges from "../../assets/images/icons/badge.png"
import imageHands from "../../assets/images/icons/hands.png"
import imageTools from "../../assets/images/icons/tool.png"
import imageScissors from "../../assets/images/icons/scissors.png"
 
export default function Sidebar(){
    
    return(
        <aside id="sidebar-component">
            <article id="img-royal-lux"></article>
            <ButtonProfile></ButtonProfile>
            <ButtonSidebarDefault name="Dashboard" pathImage={imageHome}></ButtonSidebarDefault>
            <ButtonSidebarDefault name="Usuários" pathImage={imageUsers}></ButtonSidebarDefault>
            <ButtonSidebarDefault name="Cargos" pathImage={imageBadges}></ButtonSidebarDefault>
            <ButtonSidebarDefault name="Atendimentos" pathImage={imageHands}></ButtonSidebarDefault>
            <ButtonSidebarDefault name="Serviços" pathImage={imageTools}></ButtonSidebarDefault>
            <ButtonSidebarDefault name="Materiais" pathImage={imageScissors}></ButtonSidebarDefault>
        </aside>
    );
}