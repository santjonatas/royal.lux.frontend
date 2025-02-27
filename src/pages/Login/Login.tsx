import './Login.css'
import { useEffect } from "react";
import ButtonDefault from '../../components/buttons/ButtonDefault/ButtonDefault';
import { useState } from "react";
import InputDefault from '../../components/inputs/InputDefault/InputDefault';

export default function Login() {

    const [textoBotaoLogin] = useState("Login");

    useEffect(() => {
      document.title = "Login | Royal Lux";
    }, []); 

    return (
      <main>
        <div id="div-aba-login">
          <form action="/submit" method="POST" id="form-login">
            <article id="logo-royal-lux"></article>

            <div id="div-title-login">
              <h2 id="title-login">Realize o Login</h2>
            </div>

            <InputDefault placeholder="Username" name="input-username" required></InputDefault>

            <InputDefault placeholder="Password" type="password" name="input-password" required></InputDefault>

            <div className="div-input-lembrar-senha">
              <input type="checkbox" id="checkbox-lembrar-senha" name="checkbox-lembrar-senha"/>
              <label htmlFor="lembrar-senha">Lembrar senha</label>
            </div>

            <ButtonDefault innerText={textoBotaoLogin}></ButtonDefault>

            <div id='div-buttons-links-auth'>
              <button id="button-esqueci-minha-senha" className="button-link-auth">Esqueci minha senha</button>
            </div>
          </form>
        </div>
        <div id="div-aba-imagem">
          <article id="logo-royal-lux-nome"></article>
        </div>
      </main>
    );
  }
  