import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../../components/inputs/InputDefault/InputDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import './SalonServiceAdd.css';

import IconNameImg from '../../../assets/images/icons/tools.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconToolsImg from '../../../assets/images/icons/tools-simple.png';
import IconClockImg from '../../../assets/images/icons/clock.png'
import IconMoneyImg from '../../../assets/images/icons/money.png'
import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';

interface SalonServiceFormData {
  name: string;
  detail: string;
}

interface SalonServiceAddProps {
  goBack: () => void;
}

export default function SalonServiceAdd({ goBack }: SalonServiceAddProps) {
  const [formData, setFormData] = useState<SalonServiceFormData>({
    name: '',
    detail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      const response = await fetch(`${API_URL}/api/salonServices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          detail: formData.detail
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar função');
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <ArticleTitlePage
        img={IconToolsImg}
        alt="Serviço"
        name="Serviços"
        description="Gerencie os serviços do sistema"
      >
      </ArticleTitlePage>
      <form id="main-role-add-page" onSubmit={handleSubmit}>
        <h3 id="role-add-action-page">Adicionar novo serviço</h3>
        <div id="div-inputs-role-add">
          <InputRegisterProps
            img={IconNameImg}
            label="Nome"
            alt="Função"
            placeholder="Ex: Corte de cabelo" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            id='details-id'
            img={IconDetailsImg}
            label="Descrição"
            alt="Descrição"
            placeholder="Ex: Realizar diferentes cortes de cabelo" 
            name="detail" 
            value={formData.detail} 
            onChange={handleChange} 
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            id='estimated-time-id'
            img={IconClockImg}
            label="Tempo estimado"
            alt="Tempo estimado"
            placeholder="Ex: 00:45:00" 
            name="estimatedTime" 
            value={formData.detail} 
            onChange={handleChange} 
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            id='value-id'
            img={IconMoneyImg}
            label="Preço"
            alt="Preço"
            placeholder="Ex: 35,00" 
            name="value" 
            value={formData.detail} 
            onChange={handleChange} 
            disabled={loading}
            >
          </InputRegisterProps>
        </div>

        <div id="div-error-message">
          {error && <div className="error-message">{error}</div>}
        </div>

        <div id="div-buttons-role-add">
          <ButtonDefault 
            innerText="Cancelar" 
            type="button"
            onClick={goBack}
            disabled={loading}
          />
          <ButtonDefault 
            innerText={loading ? "Processando..." : "+ Adicionar"} 
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
}