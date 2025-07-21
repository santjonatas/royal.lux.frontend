import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../../components/inputs/InputDefault/InputDefault';
import './RoleAdd.css';

interface RoleFormData {
  name: string;
  detail: string;
}

interface RoleAddProps {
  goBack: () => void; // Função para voltar à lista de roles
}

export default function RoleAdd({ goBack }: RoleAddProps) {
  const [formData, setFormData] = useState<RoleFormData>({
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

      const response = await fetch(`${API_URL}/api/roles`, {
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

      // Chama a função para voltar à lista após sucesso
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
      <article id='roles-header'>
        <h2>Funções</h2>
      </article>
      <form id="main-role-add-page" onSubmit={handleSubmit}>
        <h3 id="role-add-action-page">Adicionar nova função</h3>
        <div id="div-inputs-role-add">
          <InputDefault 
            placeholder="Nome" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            disabled={loading}
          />

          <InputDefault 
            placeholder="Detalhes" 
            name="detail" 
            value={formData.detail} 
            onChange={handleChange} 
            required
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div id="div-buttons-role-add">
          <ButtonDefault 
            innerText={loading ? "Processando..." : "Adicionar"} 
            type="submit"
            disabled={loading}
          />
          <ButtonDefault 
            innerText="Cancelar" 
            type="button"
            onClick={goBack}
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
}