import { useEffect, useState } from "react";
import './ResetPassword.css'
import './Responsive.css'
import InputDefault from "../../components/inputs/InputDefault/InputDefault";
import ButtonDefault from "../../components/buttons/ButtonDefault/ButtonDefault";
import { getValidRecoveryUsername } from "../../utils/authUtils";

const API_URL = `http://${import.meta.env.VITE_API_URL}`;

export default function ResetPassword() {
    
    useEffect(() => {
        document.title = "Alterar senha | Royal Lux";
        
        const username = getValidRecoveryUsername();
        if (!username) {
            window.location.href = '/forgot-my-password';
        } else {
            setFormDataResetPassword(prev => ({
                ...prev,
                username
            }));
        }
    }, []);

    const [formDataResetPassword, setFormDataResetPassword] = useState({
        username: "",
        newPassword: "",
        confirmNewPassword: "",
        code: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormDataResetPassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      if (formDataResetPassword.newPassword !== formDataResetPassword.confirmNewPassword) {
        setError("As senhas não coincidem");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/resetPassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formDataResetPassword.username,
            newPassword: formDataResetPassword.newPassword,
            code: formDataResetPassword.code
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message || "Erro ao alterar senha");
          return;
        }

        setSuccess("Senha alterada com sucesso!");
        
        localStorage.removeItem('recoveryUsername');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);

      } catch (error) {
        setError("Erro ao conectar ao servidor");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return(
        <main id="main-reset-password">
            <form onSubmit={handleSubmit} id="form-reset-password">
                <article id="logo-royal-lux"></article>

                <div id="div-title-form-reset-password">
                    <h2 id="title-form-reset-password">Alterar sua senha</h2>
                </div>

                <p>Digite sua nova senha e o código OTP recebido por e-mail</p>
                
                <InputDefault 
                    placeholder="Nova Senha" 
                    name="newPassword" 
                    type="password"
                    value={formDataResetPassword.newPassword} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                />

                <InputDefault 
                    placeholder="Confirmar Nova Senha" 
                    name="confirmNewPassword" 
                    type="password"
                    value={formDataResetPassword.confirmNewPassword} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                />

                <InputDefault 
                    placeholder="Código OTP" 
                    name="code" 
                    value={formDataResetPassword.code} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                />

                <ButtonDefault 
                    innerText={isLoading ? "Alterando..." : "Alterar Senha"} 
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