import { useEffect, useState } from 'react';
import HeaderProfile from '../../layouts/HeaderProfile/HeaderProfile';
import DefaultProfileImage from "../../assets/images/icons/profile.png"
import './Profile.css';
import ButtonDefault from '../../components/buttons/ButtonDefault/ButtonDefault';

interface ProfileProps {
    nome?: string;
    username?: string;
    cargo?: string;
    imagem?: string;
}

export default function Profile({ 
    nome = "Nome Usuário", 
    username = "Username",
    cargo = "Cargo", 
    imagem = DefaultProfileImage 
    }: ProfileProps) {

    useEffect(() => {
        document.title = "Profile | Royal Lux";
    }, []);

    const [dataProfile, setDataProfile] = useState({
        nome,
        username,
        cargo,
        imagem
    });

    return (
        <div id="div-profile-page">
            <HeaderProfile></HeaderProfile>
            <main id="main-profile">
                <section id="section-user">
                    <img id="img-user-profile-default" src={dataProfile.imagem} alt={nome} />
                    <h2 id="titulo-nome-user">{dataProfile.nome}</h2>
                    <h3 id="titulo-cargo-username-user">{dataProfile.username} · {dataProfile.cargo}</h3>
                    <ButtonDefault innerText="Edit Profile"></ButtonDefault>
                </section>
                <section id="section-info-user"></section>
            </main>
        </div>
    );
}
