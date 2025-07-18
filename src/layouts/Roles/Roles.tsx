import { useEffect, useState } from 'react';
import Pagination from '../../features/ButtonsFilters/Pagination/Pagination';
import RoleFilter from '../../features/Role/RoleFilter/RoleFilter';
import RoleHeader from '../../features/Role/RoleHeader/RoleHeader';
import RoleItem from '../../features/Role/RoleItem/RoleItem';
import './Roles.css';

interface Role {
  id: number;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string | null;
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  const fetchRoles = async () => {
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

    const response = await fetch(`${API_URL}/api/roles?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

    const data = await response.json();
    
    const rolesData = Array.isArray(data) ? data : data.content || data.data || [];
    const totalElements = data.totalElements || data.size || rolesData.length;

    console.log('Dados recebidos:', { data, rolesData, totalElements }); 

    setRoles(rolesData);
    setPagination(prev => ({
      ...prev,
      totalElements: Number(totalElements)
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
      size: parseInt(newFilters.size) || 10
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    fetchRoles();
  }, [pagination.page, pagination.size, filters]);

  return (
    <main id="main-roles-page">
      <article id='roles-header'>
        <h2>Funções</h2>
      </article>
      
      <section id='roles-filter'>
        <RoleFilter onFilter={handleFilter} />
        <RoleHeader />
      </section>
      
      <div id='roles-content'>
        {loading ? (
          <div className="loading-message">Carregando...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : roles.length === 0 ? (
          <div className="no-data-message">Nenhuma função encontrada</div>
        ) : (
          roles.map(role => (
            <RoleItem 
              key={role.id}
              id={role.id}
              name={role.name}
              detail={role.detail}
              createdAt={role.createdAt}
              updatedAt={role.updatedAt}
            />
          ))
        )}
      </div>
      
      <div id='roles-pagination'>
        <Pagination
          currentPage={pagination.page} 
          pageSize={pagination.size}
          totalItems={pagination.totalElements}
          onPageChange={handlePageChange} 
        />
      </div>
    </main>
  );
}