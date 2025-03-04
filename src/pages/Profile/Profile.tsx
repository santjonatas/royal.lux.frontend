import { useEffect, useState } from 'react';
import HeaderProfile from '../../layouts/HeaderProfile/HeaderProfile';
import DefaultProfileImage from "../../assets/images/icons/profile.png"
import './Profile.css';
import ButtonDefault from '../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../components/inputs/InputDefault/InputDefault';

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
                    <ButtonDefault innerText="Editar Perfil"></ButtonDefault>
                </section>
                <section id="section-info-user">
                    <form id="form-edit-profile-user" action="">
                        <label className="label-forms">Informações Pessoais</label>
                        <InputDefault placeholder="Username" type="text" name="username"></InputDefault>
                        <InputDefault placeholder="Nome" type="text" name="name"></InputDefault>
                        <InputDefault placeholder="Data de Nascimento" type="date" name="data-nascimento"></InputDefault>
                        <InputDefault placeholder="CPF" type="text" name="cpf"></InputDefault>

                        <label className="label-forms">Contato</label>
                        <InputDefault placeholder="Email" type="email" name="email"></InputDefault>
                        <InputDefault placeholder="Telefone" type="tel" name="phone"></InputDefault>

                        <label className="label-forms">Endereço</label>
                        <InputDefault placeholder="Rua" type="text" name="street"></InputDefault>
                        <InputDefault placeholder="Número" type="text" name="number"></InputDefault>
                        <InputDefault placeholder="Complemento" type="text" name="complement"></InputDefault>
                        <InputDefault placeholder="Bairro" type="text" name="neighborhood"></InputDefault>
                        <InputDefault placeholder="Cidade" type="text" name="city"></InputDefault>
                        <InputDefault placeholder="UF" type="text" name="uf"></InputDefault>
                        <InputDefault placeholder="CEP" type="text" name="cep"></InputDefault>
                    </form>
                </section>
            </main>
        </div>
    );
}
