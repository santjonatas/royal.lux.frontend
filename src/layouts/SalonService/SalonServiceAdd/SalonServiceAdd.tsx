import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
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
  description: string;
  estimatedTime: string;
  value: string;
}

interface SalonServiceAddProps {
  goBack: () => void;
}

export default function SalonServiceAdd({ goBack }: SalonServiceAddProps) {
  const [formData, setFormData] = useState<SalonServiceFormData>({
    name: '',
    description: '',
    estimatedTime: '',
    value: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEstimatedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) value = value.slice(0, 2) + ':' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + ':' + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8);

    setFormData(prev => ({
      ...prev,
      estimatedTime: value
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9,]/g, '');

    const parts = value.split(',');

    if (parts.length > 2) {
      value = parts[0] + ',' + parts[1];
    }

    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
      value = parts[0] + ',' + parts[1];
    }

    setFormData(prev => ({
      ...prev,
      value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      if (!timeRegex.test(formData.estimatedTime)) {
        setError('"Tempo estimado" deve ter o formato hh:mm:ss');
        setLoading(false);
        return;
      }

      const normalizedValue = formData.value.replace(',', '.');
      if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(normalizedValue)) {
        setError('"Preço" deve ser um número válido com até 2 casas decimais');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/salonServices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          estimatedTime: formData.estimatedTime,
          value: formData.value.replace(',', '.')
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }
      
      goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar serviço');
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
      <form id="main-salon-service-add-page" onSubmit={handleSubmit}>
        <h3 id="salon-service-add-action-page">Adicionar novo serviço</h3>
        <div id="div-inputs-salon-service-add">
          <InputRegisterProps
            img={IconNameImg}
            label="Nome"
            alt="Serviço"
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
            name="description" 
            value={formData.description} 
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
            value={formData.estimatedTime} 
            onChange={handleEstimatedTimeChange} 
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
            value={formData.value} 
            onChange={handleValueChange} 
            disabled={loading}
            >
          </InputRegisterProps>
        </div>

        <div id="div-error-message">
          {error && <div className="error-message">{error}</div>}
        </div>

        <div id="div-buttons-salon-service-add">
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