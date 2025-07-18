import { useEffect, useState } from 'react';
import Pagination from '../../features/ButtonsFilters/Pagination/Pagination';
import RoleFilter from '../../features/Role/RoleFilter/RoleFilter';
import RoleHeader from '../../features/Role/RoleHeader/RoleHeader';
import RoleItem from '../../features/Role/RoleItem/RoleItem';
import './Roles.css';

export default function Roles() {
  const [rolesData, setRolesData] = useState<any>(null);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/api/roles?page=0&size=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Erro na requisição');
      const data = await response.json();
      setRolesData(data);
    } catch (error) {
      console.error('Erro ao buscar roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <main id="main-roles-page">
      <article id='roles-header'>
        <h2>Funções</h2>
      </article>
      <section id='roles-filter'>
        <RoleFilter/>
        <RoleHeader/>
      </section>
      <div id='roles-content'>
        {rolesData?.data?.map((role: any) => (
          <RoleItem 
            key={role.id}
            id={role.id}
            name={role.name}
            detail={role.detail}
            createdAt={role.createdAt}
            updatedAt={role.updatedAt}
          />
        ))}
      </div>
      <div id='roles-pagination'>
        <Pagination/>
      </div>
    </main>
  );
}