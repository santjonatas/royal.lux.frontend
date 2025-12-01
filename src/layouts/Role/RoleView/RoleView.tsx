import { useState, useEffect } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import './RoleView.css';

import IconNameImg from '../../../assets/images/icons/suitcase.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconSuitcaseImg from '../../../assets/images/icons/suitcase-simple.png';
import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconIdImg from '../../../assets/images/icons/id.png';
import IconDateImg from '../../../assets/images/icons/calendar.png';
import TextAreaRegister from '../../../components/inputs/TextAreaRegister/TextAreaRegister';

interface RoleViewFormData {
  id: string;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
}

interface RoleViewProps {
  goBack: () => void;
  roleId: number;
}

export default function RoleView({ goBack, roleId }: RoleViewProps) {
  const [formData, setFormData] = useState<RoleViewFormData>({
    id: '',
    name: '',
    detail: '',
    createdAt: '',
    updatedAt: ''
  });
  const [originalData, setOriginalData] = useState<RoleViewFormData>({
    id: '',
    name: '',
    detail: '',
    createdAt: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchRoleData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token de autenticação não encontrado');

        const response = await fetch(`${API_URL}/api/roles?id=${roleId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

        const data = await response.json();
        
        let roleData = null;
        
        if (Array.isArray(data) && data.length > 0) {
          roleData = data[0];
        } else if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          roleData = data.content[0];
        } else if (data.data) {
          roleData = Array.isArray(data.data) ? data.data[0] : data.data;
        } else if (!Array.isArray(data)) {
          roleData = data;
        }

        if (!roleData) {
          throw new Error('Nenhum dado retornado pela API');
        }

        if (!roleData.id && roleData.id !== 0) {
          throw new Error(`ID não encontrado. Dados: ${JSON.stringify(roleData)}`);
        }

        const loadedData = {
          id: roleData.id.toString(),
          name: roleData.name || '',
          detail: roleData.detail || '',
          createdAt: formatDate(roleData.createdAt) || '',
          updatedAt: formatDate(roleData.updatedAt) || ''
        };

        setFormData(loadedData);
        setOriginalData(loadedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar função');
        console.error('Erro completo na requisição:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [roleId, API_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      const response = await fetch(`${API_URL}/api/roles?id=${roleId}`, {
        method: 'PUT',
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

      const data = await response.json();
      
      if (data.data && data.data.success) {
        const newData = {
          ...formData,
          updatedAt: formatDate(new Date().toISOString())
        };
        
        setFormData(newData);
        setOriginalData(newData);
        setIsEditing(false);
      } else {
        throw new Error('Erro ao atualizar função');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar função');
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <>
      <ArticleTitlePage
      key={isEditing ? 'editing' : 'viewing'}
      img={IconSuitcaseImg}
      alt="Função"
      name="Funções"
      description={"Gerencie as funções do sistema"}
    >
    </ArticleTitlePage>
      <form id="main-role-add-page" onSubmit={handleSubmit}>
        <h3 id="role-add-action-page">{isEditing ? "Edite esta função" : "Detalhes da função"}</h3>
        
        {loading && <div className="loading-message">Carregando...</div>}
        
        <div id="div-inputs-role-view">
          <InputRegisterProps
            img={IconIdImg}
            label="Id"
            alt="Id"
            placeholder="Ex: 1" 
            name="id" 
            value={formData.id} 
            onChange={handleChange} 
            required
            disabled
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
            disabled={!isEditing || loading}
            >
          </InputRegisterProps>

          <TextAreaRegister
            id='details-id'
            img={IconDetailsImg}
            label="Detalhes"
            alt="Detalhes"
            placeholder="Ex: Responsável pelo atendimento ao cliente" 
            name="detail" 
            value={formData.detail} 
            onChange={handleTextAreaChange}
            required
            disabled={!isEditing || loading}
            >
          </TextAreaRegister>

          <InputRegisterProps
            img={IconDateImg}
            label="Criado em"
            alt="Criado em"
            placeholder="Ex: 23/11/2025 19:34" 
            name="createdAt" 
            value={formData.createdAt} 
            onChange={handleChange} 
            required
            disabled
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDateImg}
            label="Alterado em"
            alt="Alterado em"
            placeholder="Ex: 23/11/2025 20:58" 
            name="updatedAt" 
            value={formData.updatedAt} 
            onChange={handleChange} 
            required
            disabled
            >
          </InputRegisterProps>
        </div>

        <div id="div-error-message">
          {error && <div className="error-message">{error}</div>}
        </div>

        <div id="div-buttons-role-add">
          {isEditing ? (
            <>
              <ButtonDefault 
                innerText="Cancelar" 
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
              />
              <ButtonDefault 
                innerText={loading ? "Salvando..." : "Salvar"} 
                type="button"
                onClick={handleSave}
                disabled={loading}
              />
            </>
          ) : (
            <>
              <ButtonDefault 
                innerText="Voltar" 
                type="button"
                onClick={goBack}
                disabled={loading}
              />
              <ButtonDefault 
                innerText="Editar" 
                type="button"
                onClick={handleEdit}
                disabled={loading}
              />
            </>
          )}
        </div>
      </form>
    </>
  );
}