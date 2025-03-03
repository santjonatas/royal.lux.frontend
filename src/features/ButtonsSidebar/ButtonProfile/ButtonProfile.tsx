import './ButtonProfile.css'
import DefaultProfileImage from "../../../assets/images/icons/profile.png"
import { useState } from 'react';

interface ButtonProfileProps {
    nome?: string;
    cargo?: string;
    imagem?: string;
}

export default function ButtonProfile({ 
    nome = "Nome Usuário", 
    cargo = "Cargo", 
    imagem = DefaultProfileImage 
    }: ButtonProfileProps) {

    const [dataButtonProfile, setDataButtonProfile] = useState({
        nome,
        cargo,
        imagem
    });

    return (
        <button id="button-profile-component">
            <div className="div-img-profile">
                <img src={dataButtonProfile.imagem} alt="Perfil" className="img-profile" />
            </div>
            <div id="div-info-perfil">
                <h3>{dataButtonProfile.nome}</h3>
                <h4>{dataButtonProfile.cargo}</h4>
            </div>
            <article id="icon-verify"></article>
        </button>
    );
}
