import './Login.css'
import './Responsive.css'
import { useEffect } from "react";
import { useState } from "react";
import ButtonDefault from '../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../components/inputs/InputDefault/InputDefault';
import { useNavigate } from 'react-router-dom';
const API_URL = `http://${import.meta.env.VITE_API_URL}`;

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
      document.title = "Login | Royal Lux";
    }, []); 

    const [formDataLogin, setFormDataLogin] = useState({
      username: localStorage.getItem("rememberedUsername") || "",
      password: localStorage.getItem("rememberedPassword") || "",
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormDataLogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataLogin),
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message || "Erro no login");
          return;
        }

        if (responseData?.data?.token) {
          const expirationMinutes = 60; 
          const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000;

          localStorage.setItem("authToken", responseData.data.token);
          localStorage.setItem("authTokenExpiration", expirationTime.toString());

          if (rememberMe) {
            localStorage.setItem("rememberedUsername", formDataLogin.username);
            localStorage.setItem("rememberedPassword", formDataLogin.password);
          } else {
            localStorage.removeItem("rememberedUsername");
            localStorage.removeItem("rememberedPassword");
          }

          window.location.href = "/dashboard";
        }
      } catch (error) {
        setError("Erro ao conectar ao servidor");
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
              <input
                type="checkbox"
                id="checkbox-lembrar-senha"
                name="checkbox-lembrar-senha"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="lembrar-senha">Lembrar senha</label>
            </div>

            <ButtonDefault innerText="Login" type="submit"></ButtonDefault>

            <div id='div-error-message'>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>

            <div id='div-buttons-links-auth'>
              <button 
                id="button-esqueci-minha-senha" 
                className="button-link-auth"
                onClick={() => navigate('/forgot-my-password')}
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
        <div id="div-aba-imagem">
          <article id="logo-royal-lux-nome"></article>
        </div>
      </main>
    );
  }
  