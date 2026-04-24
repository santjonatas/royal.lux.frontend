import { useState, useEffect } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import TextAreaRegister from '../../../components/inputs/TextAreaRegister/TextAreaRegister';
import './SalonServiceView.css';

import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconNameImg from '../../../assets/images/icons/tools.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconToolsImg from '../../../assets/images/icons/tools-simple.png';
import IconClockImg from '../../../assets/images/icons/clock.png';
import IconMoneyImg from '../../../assets/images/icons/money.png';
import IconIdImg from '../../../assets/images/icons/id.png';
import IconDateImg from '../../../assets/images/icons/calendar.png';

interface SalonServiceViewFormData {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

interface SalonServiceViewProps {
  goBack: () => void;
  salonServiceId: number;
}

export default function SalonServiceView({ goBack, salonServiceId }: SalonServiceViewProps) {
  const [formData, setFormData] = useState<SalonServiceViewFormData>({
    id: '',
    name: '',
    description: '',
    estimatedTime: '',
    value: '',
    createdAt: '',
    updatedAt: ''
  });
  const [originalData, setOriginalData] = useState<SalonServiceViewFormData>({
    id: '',
    name: '',
    description: '',
    estimatedTime: '',
    value: '',
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

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const numeric = Number(String(value).replace(',', '.'));
    if (Number.isNaN(numeric)) return '';
    return numeric.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  const handleEstimatedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

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

  useEffect(() => {
    const fetchSalonService = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token de autenticação não encontrado');

        const response = await fetch(`${API_URL}/api/salonServices?id=${salonServiceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

        const data = await response.json();

        let salonServiceData: any = null;

        if (Array.isArray(data) && data.length > 0) {
          salonServiceData = data[0];
        } else if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          salonServiceData = data.content[0];
        } else if (data.data) {
          salonServiceData = Array.isArray(data.data) ? data.data[0] : data.data;
        } else if (!Array.isArray(data)) {
          salonServiceData = data;
        }

        if (!salonServiceData) {
          throw new Error('Nenhum dado retornado pela API');
        }

        const loadedData: SalonServiceViewFormData = {
          id: salonServiceData.id?.toString() ?? '',
          name: salonServiceData.name ?? '',
          description: salonServiceData.description ?? '',
          estimatedTime: salonServiceData.estimatedTime ?? '',
          value: formatValue(salonServiceData.value),
          createdAt: formatDate(salonServiceData.createdAt) ?? '',
          updatedAt: formatDate(salonServiceData.updatedAt) ?? ''
        };

        setFormData(loadedData);
        setOriginalData(loadedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar serviço');
        console.error('Erro completo na requisição:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonService();
  }, [salonServiceId, API_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEstimatedTimeTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEstimatedTimeChange(e);
  };

  const handleValueTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      const response = await fetch(`${API_URL}/api/salonServices?id=${salonServiceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          estimatedTime: formData.estimatedTime,
          value: Number(normalizedValue)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && (data.success || data.data?.success || response.ok)) {
        const updatedData = {
          ...formData,
          updatedAt: formatDate(new Date().toISOString())
        };
        setFormData(updatedData);
        setOriginalData(updatedData);
        setIsEditing(false);
      } else {
        throw new Error('Erro ao atualizar serviço');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar serviço');
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
        img={IconToolsImg}
        alt="Serviço"
        name="Serviços"
        description="Gerencie os serviços do sistema"
      />
      <form id="main-salon-service-view-page" onSubmit={handleSubmit}>
        <h3 id="salon-service-view-action-page">{isEditing ? 'Edite este serviço' : 'Detalhes do serviço'}</h3>

        {loading && <div className="loading-message">Carregando...</div>}

        <div id="div-inputs-salon-service-view">
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
          />

          <InputRegisterProps
            img={IconNameImg}
            label="Nome"
            alt="Nome"
            placeholder={isEditing ? 'Ex: Corte de cabelo' : ''}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!isEditing || loading}
          />

          <InputRegisterProps
            img={IconClockImg}
            label="Tempo estimado"
            alt="Tempo estimado"
            placeholder={isEditing ? 'Ex: 00:45:00' : ''}
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleEstimatedTimeTextChange}
            required
            disabled={!isEditing || loading}
          />

          <InputRegisterProps
            img={IconMoneyImg}
            label="Preço"
            alt="Preço"
            placeholder={isEditing ? 'Ex: 35,00' : ''}
            name="value"
            value={formData.value}
            onChange={handleValueTextChange}
            required
            disabled={!isEditing || loading}
          />

          <TextAreaRegister
            id="description-id"
            img={IconDetailsImg}
            label="Descrição"
            alt="Descrição"
            placeholder={isEditing ? 'Ex: Realizar diferentes cortes de cabelo' : ''}
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            required
            disabled={!isEditing || loading}
          />

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
          />

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
          />
        </div>

        <div id="div-error-message">
          {error && <div className="error-message">{error}</div>}
        </div>

        <div id="div-buttons-salon-service-view">
          {isEditing ? (
            <>
              <ButtonDefault
                innerText="Cancelar"
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
              />
              <ButtonDefault
                innerText={loading ? 'Salvando...' : 'Salvar'}
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
