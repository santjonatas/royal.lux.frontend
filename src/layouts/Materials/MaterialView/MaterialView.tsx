import { useState, useEffect } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputRegisterProps from '../../../components/inputs/InputRegister/InputRegister';
import './MaterialView.css';

import IconNameImg from '../../../assets/images/icons/suitcase.png';
import IconDetailsImg from '../../../assets/images/icons/document.png';
import IconSuitcaseImg from '../../../assets/images/icons/suitcase-simple.png';
import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconIdImg from '../../../assets/images/icons/id.png';
import IconDateImg from '../../../assets/images/icons/calendar.png';
import TextAreaRegister from '../../../components/inputs/TextAreaRegister/TextAreaRegister';

interface MaterialViewFormData {
  id: string;
  name: string;
  description: string;
  value: string;
  availableQuantity: string;
  reservedQuantity: string;
  createdAt: string;
  updatedAt: string;
}

interface MaterialViewProps {
  goBack: () => void;
  materialId: number;
}

export default function MaterialView({ goBack, materialId }: MaterialViewProps) {
  const [formData, setFormData] = useState<MaterialViewFormData>({
    id: '',
    name: '',
    description: '',
    value: '',
    availableQuantity: '',
    reservedQuantity: '',
    createdAt: '',
    updatedAt: ''
  });
  const [originalData, setOriginalData] = useState<MaterialViewFormData>({
    id: '',
    name: '',
    description: '',
    value: '',
    availableQuantity: '',
    reservedQuantity: '',
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

  useEffect(() => {
    const fetchMaterialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token de autenticação não encontrado');

        const response = await fetch(`${API_URL}/api/materials?id=${materialId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

        const data = await response.json();

        let materialData = null;

        if (Array.isArray(data) && data.length > 0) {
          materialData = data[0];
        } else if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          materialData = data.content[0];
        } else if (data.data) {
          materialData = Array.isArray(data.data) ? data.data[0] : data.data;
        } else if (!Array.isArray(data)) {
          materialData = data;
        }

        if (!materialData) {
          throw new Error('Nenhum dado retornado pela API');
        }

        if (!materialData.id && materialData.id !== 0) {
          throw new Error(`ID não encontrado. Dados: ${JSON.stringify(materialData)}`);
        }

        const loadedData = {
          id: materialData.id.toString(),
          name: materialData.name || '',
          description: materialData.description ?? materialData.detail ?? '',
          value: formatValue(materialData.value),
          availableQuantity: materialData.availableQuantity !== undefined && materialData.availableQuantity !== null ? materialData.availableQuantity.toString() : '',
          reservedQuantity: materialData.reservedQuantity !== undefined && materialData.reservedQuantity !== null ? materialData.reservedQuantity.toString() : '',
          createdAt: formatDate(materialData.createdAt) || '',
          updatedAt: formatDate(materialData.updatedAt) || ''
        };

        setFormData(loadedData);
        setOriginalData(loadedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar material');
        console.error('Erro completo na requisição:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialData();
  }, [materialId, API_URL]);

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

      const normalizedValue = formData.value.replace(',', '.');
      if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(normalizedValue)) {
        setError('"Valor" deve ser um número válido com até 2 casas decimais');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/materials?id=${materialId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          value: Number(normalizedValue)
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
          value: formatValue(normalizedValue),
          updatedAt: formatDate(new Date().toISOString())
        };

        setFormData(newData);
        setOriginalData(newData);
        setIsEditing(false);
      } else {
        throw new Error('Erro ao atualizar material');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar material');
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
      alt="Material"
      name="Materiais"
      description={"Gerencie os materiais do sistema"}
    >
    </ArticleTitlePage>
      <form id="main-material-add-page" onSubmit={handleSubmit}>
        <h3 id="material-add-action-page">{isEditing ? "Edite este material" : "Detalhes do material"}</h3>

        {loading && <div className="loading-message">Carregando...</div>}

        <div id="div-inputs-material-view">
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
            placeholder={!isEditing ? "" : "Ex: Tinta"}
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
            placeholder={!isEditing ? "" : "Ex: Tinta para pintura"}
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            required
            disabled={!isEditing || loading}
            >
          </TextAreaRegister>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Valor"
            alt="Valor"
            placeholder={!isEditing ? "" : "Ex: 10,00"}
            name="value"
            value={formData.value}
            onChange={handleValueChange}
            required
            disabled={!isEditing || loading}
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Quantidade disponível"
            alt="Quantidade disponível"
            placeholder="N/A"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            disabled
            >
          </InputRegisterProps>

          <InputRegisterProps
            img={IconDetailsImg}
            label="Quantidade reservada"
            alt="Quantidade reservada"
            placeholder="N/A"
            name="reservedQuantity"
            value={formData.reservedQuantity}
            onChange={handleChange}
            disabled
            >
          </InputRegisterProps>

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
            placeholder={formData.updatedAt ? "Ex: 23/11/2025 20:58" : "N/A"}
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

        <div id="div-buttons-material-add">
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
