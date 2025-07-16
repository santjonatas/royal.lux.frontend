import './Login.css'
import './Responsive.css'
import { useEffect } from "react";
import { useState } from "react";
import ButtonDefault from '../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../components/inputs/InputDefault/InputDefault';
const API_URL = `http://${import.meta.env.VITE_API_URL}`;

export default function Login() {

    useEffect(() => {
      document.title = "Login | Royal Lux";
    }, []); 

    const [formDataLogin, setFormDataLogin] = useState({
      username: "",
      password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormDataLogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataLogin),
        });
    
        const responseData = await response.json().catch(() => null);
    
        console.log({
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: responseData,
        });
    
        if (!response.status.toString().startsWith("2")) {
          return; 
        }

        if (responseData?.data?.token) {
          localStorage.setItem("authToken", responseData.data.token);
          window.location.href = "/dashboard"; 
        }

        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <main id="main-login">
        <div id="div-aba-login">
          <form onSubmit={handleSubmit} id="form-login">
            <article id="logo-royal-lux"></article>

            <div id="div-title-login">
              <h2 id="title-login">Realize o Login</h2>
            </div>

            <InputDefault 
              placeholder="Username" 
              name="username" 
              value={formDataLogin.username} 
              onChange={handleChange} 
              required>
            </InputDefault>

            <InputDefault 
              placeholder="Password" 
              type="password" 
              name="password" 
              value={formDataLogin.password} 
              onChange={handleChange} 
              required>
            </InputDefault>

            <div className="div-input-lembrar-senha">
              <input type="checkbox" id="checkbox-lembrar-senha" name="checkbox-lembrar-senha"/>
              <label htmlFor="lembrar-senha">Lembrar senha</label>
            </div>

            <ButtonDefault innerText="Login"></ButtonDefault>

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
  