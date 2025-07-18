import { useEffect, useState } from "react";
import './ForgotMyPassword.css'
import './Responsive.css'
import { useNavigate } from "react-router-dom";
import InputDefault from "../../components/inputs/InputDefault/InputDefault";
import ButtonDefault from "../../components/buttons/ButtonDefault/ButtonDefault";

const API_URL = `http://${import.meta.env.VITE_API_URL}`;

export default function ForgotMyPassword() {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Esqueci minha senha | Royal Lux";
    }, []);

    const [formDataForgotMyPassword, setFormDataForgotMyPassword] = useState({
        username: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormDataForgotMyPassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(`${API_URL}/api/auth/sendPasswordRecoveryCode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formDataForgotMyPassword.username,
            deliveryChannel: "EMAIL"
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message || "Erro ao enviar código de recuperação");
          return;
        }

        const expirationTime = new Date().getTime() + 5 * 60 * 1000; 
        localStorage.setItem('recoveryUsername', JSON.stringify({
          value: formDataForgotMyPassword.username,
          expiresAt: expirationTime
        }));

        setSuccess("Código de recuperação enviado com sucesso!");

        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } catch (error) {
        setError("Erro ao conectar ao servidor");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return(
        <main id="main-forgot-my-password">
            <form onSubmit={handleSubmit} id="form-forgot-my-password">
                <article id="logo-royal-lux"></article>

                <div id="div-title-form-forgot-my-password">
                    <h2 id="title-form-forgot-my-password">Recupere sua senha</h2>
                </div>

                <p>Digite seu username abaixo para receber o código OTP em seu E-mail</p>
                
                <InputDefault 
                    placeholder="Username" 
                    name="username" 
                    value={formDataForgotMyPassword.username} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                />

                <ButtonDefault 
                    innerText={isLoading ? "Enviando..." : "Enviar"} 
                    disabled={isLoading}
                    type="submit"
                />

                <div id='div-message'>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}
                </div>
            </form>
        </main>
    )
}