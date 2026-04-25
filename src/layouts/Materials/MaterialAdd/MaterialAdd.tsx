import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import './MaterialAdd.css';

import IconNameImg from '../../../assets/images/icons/suitcase.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconSuitcaseImg from '../../../assets/images/icons/suitcase-simple.png';
import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';

interface MaterialFormData {
  name: string;
  description: string;
  value: string;
  availableQuantity: string;
}

interface MaterialAddProps {
  goBack: () => void;
}

export default function MaterialAdd({ goBack }: MaterialAddProps) {
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    description: '',
    value: '',
    availableQuantity: ''
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      availableQuantity: digitsOnly
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      const response = await fetch(`${API_URL}/api/materials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          value: formData.value.trim() ? formData.value.replace(',', '.') : null,
          availableQuantity: Number(formData.availableQuantity)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar material');
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ArticleTitlePage
        img={IconSuitcaseImg}
        alt="Material"
        name="Materiais"
        description="Gerencie os materiais do sistema"
      >
      </ArticleTitlePage>
      <form id="main-material-add-page" onSubmit={handleSubmit}>
        <h3 id="material-add-action-page">Adicionar novo material</h3>
        <div id="div-inputs-material-add">
          <InputRegisterProps
            img={IconNameImg}
            label="Nome"
            alt="Material"
            placeholder="Ex: Tinta"
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
            placeholder="Ex: Tinta para pintura"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Valor"
            alt="Valor"
            placeholder="Ex: 10,00"
            name="value"
            value={formData.value}
            onChange={handleValueChange}
            disabled={loading}
          >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Quantidade disponível"
            alt="Quantidade disponível"
            placeholder="Ex: 5"
            name="availableQuantity"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.availableQuantity}
            onChange={handleQuantityChange}
            required
            disabled={loading}
          >
          </InputRegisterProps>
        </div>

        <div id="div-error-message">
          {error && <div className="error-message">{error}</div>}
        </div>

        <div id="div-buttons-material-add">
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
