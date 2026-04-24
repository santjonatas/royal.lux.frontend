import { useEffect, useState } from 'react';
import Pagination from '../../../features/ButtonsFilters/Pagination/Pagination';
import ModalConfirm from '../../../components/modals/ModalConfirm/ModalConfirm';
import './SalonServices.css';

import ArticleTitlePage from '../../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconToolsImg from '../../../assets/images/icons/tools-simple.png';
import SalonServiceFilter from '../../../features/SalonService/SalonServiceFilter/SalonServiceFilter';
import SalonServiceItem from '../../../features/SalonService/SalonServiceItem/SalonServiceItem';
import SalonServiceHeader from '../../../features/SalonService/SalonServiceHeader/SalonServiceHeader';
import SalonServiceAdd from '../SalonServiceAdd/SalonServiceAdd';
import SalonServiceView from '../SalonServiceView/SalonServiceView';

interface SalonService {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  value: number;
  createdAt: string;
  updatedAt: string | null;
}

export default function SalonServices() {
  const [salonServices, setSalonServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showViewPage, setShowViewPage] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
  });

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    description: '',
    value: '',
    ascending: false,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const fetchSalonServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      const params = new URLSearchParams();
      if (filters.id) params.append('id', filters.id);
      if (filters.name) params.append('name', filters.name);
      if (filters.description) params.append('description', filters.description);
      if (filters.value) params.append('value', filters.value.toString());
      params.append('page', pagination.page.toString());
      params.append('size', pagination.size.toString());
      params.append('ascending', filters.ascending.toString());

      const response = await fetch(`${API_URL}/api/salonServices?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

      const data = await response.json();

      const servicesData = Array.isArray(data) ? data : data.content || data.data || [];
      const totalElements = data.totalElements || data.size || servicesData.length;

      setSalonServices(servicesData);
      setPagination(prev => ({
        ...prev,
        totalElements: Number(totalElements),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters: {
    id: string;
    name: string;
    description: string;
    value: string;
    size: string;
    ascending: boolean;
  }) => {
    setFilters({
      id: newFilters.id,
      name: newFilters.name,
      description: newFilters.description,
      value: newFilters.value,
      ascending: newFilters.ascending,
    });
    setPagination(prev => ({
      ...prev,
      page: 0,
      size: parseInt(newFilters.size) || 10,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const goToAddPage = () => setShowAddPage(true);

  const goToViewPage = (id: number) => {
    setSelectedServiceId(id);
    setShowViewPage(true);
  };

  const goBackToList = () => {
    setShowAddPage(false);
    setShowViewPage(false);
    setSelectedServiceId(null);
    fetchSalonServices();
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      setShowModal(true);
    }
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await Promise.all(selectedIds.map(id =>
        fetch(`${API_URL}/api/salonServices?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ));
      setSelectedIds([]);
      setShowModal(false);
      fetchSalonServices();
    } catch (err) {
      console.error("Erro ao deletar serviços:", err);
    }
  };

  useEffect(() => {
    if (!showAddPage && !showViewPage) {
      fetchSalonServices();
    }
  }, [pagination.page, pagination.size, filters, showAddPage, showViewPage]);

  if (showAddPage) {
    return <SalonServiceAdd goBack={goBackToList} />;
  }

  if (showViewPage && selectedServiceId !== null) {
    return <SalonServiceView goBack={goBackToList} salonServiceId={selectedServiceId} />;
  }

  return (
    <main id="main-salon-services-page">
      <ArticleTitlePage
        img={IconToolsImg}
        alt="Serviço"
        name="Serviços"
        description="Gerencie os serviços do sistema"
      >
      </ArticleTitlePage>

      <section id="salon-service-filter">
        <SalonServiceFilter
          onFilter={handleFilter}
          onAdd={goToAddPage}
          onDelete={handleDeleteClick}
        />
        <SalonServiceHeader/>
      </section>

      <div id="salon-services-content">
        {loading ? (
          <div className="loading-message">Carregando...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : salonServices.length === 0 ? (
          <div className="no-data-message">Nenhum serviço encontrado</div>
        ) : (
          salonServices.map(salonServices => (
            <SalonServiceItem
              key={salonServices.id}
              id={salonServices.id}
              name={salonServices.name}
              value={salonServices.value}
              createdAt={salonServices.createdAt}
              updatedAt={salonServices.updatedAt}
              checked={selectedIds.includes(salonServices.id)}
              onSelect={handleSelectItem}
              onView={goToViewPage}
            />
          ))
        )}
      </div>

      <div id="salon-services-pagination">
        <Pagination
          currentPage={pagination.page}
          pageSize={pagination.size}
          totalItems={pagination.totalElements}
          onPageChange={handlePageChange}
        />
      </div>

      {showModal && (
        <ModalConfirm
          title="Confirmar exclusão"
          message="Tem certeza que deseja excluir os itens selecionados?"
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}