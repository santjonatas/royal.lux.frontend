import { useEffect, useState } from 'react';
import Pagination from '../../features/ButtonsFilters/Pagination/Pagination';
import MaterialFilter from '../../features/Material/MaterialFilter/MaterialFilter';
import MaterialHeader from '../../features/Material/MaterialHeader/MaterialHeader';
import MaterialItem from '../../features/Material/MaterialItem/MaterialItem';
import MaterialAdd from './MaterialAdd/MaterialAdd';
import ModalConfirm from '../../components/modals/ModalConfirm/ModalConfirm';
import './Materials.css';

import ArticleTitlePage from '../../components/articles/ArticleTitlePage/ArticleTitlePage';
import IconSuitcaseImg from '../../assets/images/icons/suitcase-simple.png'; // You can change this icon for materials
import MaterialView from './MaterialView/MaterialView';

interface Material {
  id: number;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string | null;
}

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showViewPage, setShowViewPage] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
  });

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    detail: '',
    ascending: false,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token de autenticação não encontrado');

      const params = new URLSearchParams();
      if (filters.id) params.append('id', filters.id);
      if (filters.name) params.append('name', filters.name);
      if (filters.detail) params.append('detail', filters.detail);
      params.append('page', pagination.page.toString());
      params.append('size', pagination.size.toString());
      params.append('ascending', filters.ascending.toString());

      const response = await fetch(`${API_URL}/api/materials?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

      const data = await response.json();

      const materialsData = Array.isArray(data) ? data : data.content || data.data || [];
      const totalElements = data.totalElements || data.size || materialsData.length;

      setMaterials(materialsData);
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
    detail: string;
    size: string;
    ascending: boolean;
  }) => {
    setFilters({
      id: newFilters.id,
      name: newFilters.name,
      detail: newFilters.detail,
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
    setSelectedMaterialId(id);
    setShowViewPage(true);
  };

  const goBackToList = () => {
    setShowAddPage(false);
    setShowViewPage(false);
    setSelectedMaterialId(null);
    fetchMaterials();
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
        fetch(`${API_URL}/api/materials?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ));
      setSelectedIds([]);
      setShowModal(false);
      fetchMaterials();
    } catch (err) {
      console.error("Erro ao deletar materiais:", err);
    }
  };

  useEffect(() => {
    if (!showAddPage) {
      fetchMaterials();
    }
  }, [pagination.page, pagination.size, filters, showAddPage]);

  if (showAddPage) {
    return <MaterialAdd goBack={goBackToList} />;
  }

  if (showViewPage && selectedMaterialId !== null) {
    return <MaterialView goBack={goBackToList} materialId={selectedMaterialId} />;
  }

  return (
    <main id="main-materials-page">
      <ArticleTitlePage
        img={IconSuitcaseImg}
        alt="Material"
        name="Materiais"
        description="Gerencie os materiais do sistema"
      >
      </ArticleTitlePage>

      <section id="materials-filter">
        <MaterialFilter
          onFilter={handleFilter}
          onAdd={goToAddPage}
          onDelete={handleDeleteClick}
        />
        <MaterialHeader />
      </section>

      <div id="materials-content">
        {loading ? (
          <div className="loading-message">Carregando...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : materials.length === 0 ? (
          <div className="no-data-message">Nenhum material encontrado</div>
        ) : (
          materials.map(material => (
            <MaterialItem
              key={material.id}
              id={material.id}
              name={material.name}
              detail={material.detail}
              createdAt={material.createdAt}
              updatedAt={material.updatedAt}
              checked={selectedIds.includes(material.id)}
              onSelect={handleSelectItem}
              onView={() => goToViewPage(material.id)}
            />
          ))
        )}
      </div>

      <div id="materials-pagination">
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