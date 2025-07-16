import { useEffect, useState } from "react";
import './ForgotMyPassword.css'
import InputDefault from "../../components/inputs/InputDefault/InputDefault";
import ButtonDefault from "../../components/buttons/ButtonDefault/ButtonDefault";

export default function ForgotMyPassword() {

    useEffect(() => {
        document.title = "Esqueci minha senha | Royal Lux";
    });

    const [formDataForgotMyPassword, setFormDataForgotMyPassword] = useState({
        username: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormDataForgotMyPassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

    }

    return(
        <main id="main-forgot-my-password">
            <form onSubmit={handleSubmit} id="form-forgot-my-password">
                <article id="logo-royal-lux"></article>

                <div id="div-title-form-forgot-my-password">
                    <h2 id="title-form-forgot-my-password">Recupere sua senha</h2>
                </div>

                <p>Digite seu username abaixo para recuperar sua senha</p>
                
                <InputDefault 
                    placeholder="Username" 
                    name="username" 
                    value={formDataForgotMyPassword.username} 
                    onChange={handleChange} 
                    required>
                </InputDefault>

                <ButtonDefault innerText="Enviar"></ButtonDefault>
            </form>
        </main>
    )
}