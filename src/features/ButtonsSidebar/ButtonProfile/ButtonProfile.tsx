import './ButtonProfile.css'
import Profile from "../../../assets/images/icons/profile.png"
import { useState } from 'react';

export default function ButtonProfile(){

    const profileImage = Profile;
    
    const [dataButtonProfile, setDataButtonProfile] = useState({
        nome: "Nome Usuário",
        cargo: "Cargo"
    });
    
    return(
        <button id="button-profile-component">
            <div className="div-img-profile">
                <img src={profileImage} alt="Perfil" className="img-profile"/>
            </div>
            <div id="div-info-perfil">
                <h3>{dataButtonProfile.nome}</h3>
                <h4>{dataButtonProfile.cargo}</h4>
            </div>
            <article id="icon-verify"></article>
        </button>
    );
}