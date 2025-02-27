import './Login.css'
import { useEffect } from "react";

export default function Login() {

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

            <input type="text" id="input-username" className="input-form" name="input-username" required placeholder="Username"/>

            <input type="password" id="input-password" className="input-form" name="input-password" required placeholder="Password"></input>

            <div className="div-input-lembrar-senha">
              <input type="checkbox" id="checkbox-lembrar-senha" name="checkbox-lembrar-senha"/>
              <label htmlFor="lembrar-senha">Lembrar senha</label>
            </div>

            <button type="submit" id="button-login">Login</button>

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
  