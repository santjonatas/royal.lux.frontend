import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../../components/inputs/InputDefault/InputDefault';
import SelectBoxOrderFilter from '../../ButtonsFilters/SelectBoxOrderFilter/SelectBoxOrderFilter';
import './RoleFilter.css';
import './Responsive.css';

interface RoleFilterProps {
  onFilter: (filters: {
    id: string;
    name: string;
    detail: string;
    size: string;
    ascending: boolean;
  }) => void;
}

export default function RoleFilter({ onFilter }: RoleFilterProps) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [size, setSize] = useState('10');
  const [ascending, setAscending] = useState(true);

  const handleSearch = () => {
    onFilter({
      id,
      name,
      detail,
      size,
      ascending
    });
  };

  return (
    <section id="role-filter-section">
      <article id='filter-icon'></article>
      
      <InputDefault 
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder='Id'
      />
      
      <InputDefault 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Função'
      />
      
      <InputDefault 
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder='Detalhes'
      />

      <div className="icon-label-container">
        <div className="icon-order"></div> 
        <span className="label-order">Ordem</span>
      </div>
      
      <SelectBoxOrderFilter
        value={ascending}
        onChange={setAscending}
      />
      
      <InputDefault 
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder='Quantidade'
      />

      <ButtonDefault 
        innerText='Buscar'
        onClick={handleSearch}
      />
      
      <ButtonDefault 
        innerText='Adicionar'
        onClick={() => {}} 
      />
      
      <ButtonDefault 
        innerText='Deletar'
        onClick={() => {}} 
      />
    </section>
  );
}