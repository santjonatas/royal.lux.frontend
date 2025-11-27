import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import './RoleView.css';

import IconNameImg from '../../../assets/images/icons/suitcase.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconSuitcaseImg from '../../../assets/images/icons/suitcase-simple.png';
import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconIdImg from '../../../assets/images/icons/id.png';
import IconCreatedAtImg from '../../../assets/images/icons/calendar-date.png';
import IconUpdatedAtImg from '../../../assets/images/icons/calendar.png';

interface RoleViewFormData {
  id: string;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
}

interface RoleViewProps {
  goBack: () => void;
}

export default function RoleView({ goBack }: RoleViewProps) {
  const [formData, setFormData] = useState<RoleViewFormData>({
    id: '',
    name: '',
    detail: '',
    createdAt: '',
    updatedAt: ''
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

      const response = await fetch(`${API_URL}/api/roles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: formData.id,
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
        img={IconSuitcaseImg}
        alt="Função"
        name="Funções"
        description="Gerencie as funções do sistema"
      >
      </ArticleTitlePage>
      <form id="main-role-add-page" onSubmit={handleSubmit}>
        <h3 id="role-add-action-page">Detalhes da função</h3>
        <div id="div-inputs-role-add">
          <InputRegisterProps
            img={IconIdImg}
            label="Id"
            alt="Id"
            placeholder="Ex: 1" 
            name="id" 
            value={formData.id} 
            onChange={handleChange} 
            required
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconNameImg}
            label="Nome"
            alt="Nome"
            placeholder="Ex: Atendente" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Detalhes"
            alt="Detalhes"
            placeholder="Ex: Responsável pelo atendimento ao cliente" 
            name="detail" 
            value={formData.detail} 
            onChange={handleChange} 
            required
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconCreatedAtImg}
            label="Criado em"
            alt="Criado em"
            placeholder="Ex: 23/11/2025 19:34" 
            name="createdAt" 
            value={formData.createdAt} 
            onChange={handleChange} 
            required
            disabled={loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconUpdatedAtImg}
            label="Alterado em"
            alt="Alterado em"
            placeholder="Ex: 23/11/2025 20:58" 
            name="updatedAt" 
            value={formData.updatedAt} 
            onChange={handleChange} 
            required
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
            innerText={loading ? "Processando..." : "Salvar"} 
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
}