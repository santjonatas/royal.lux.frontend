import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import InputDefault from '../../../components/inputs/InputDefault/InputDefault';
import SelectBoxOrderFilter from '../../ButtonsFilters/SelectBoxOrderFilter/SelectBoxOrderFilter';
import './SalonServiceFilter.css';
import './Responsive.css';

interface SalonServiceFilterProps {
  onFilter: (filters: {
    id: string;
    name: string;
    description: string;
    value: string;
    size: string;
    ascending: boolean;
  }) => void;
  onAdd: () => void; 
  onDelete: () => void;
}

export default function SalonServiceFilter({ onFilter, onAdd, onDelete }: SalonServiceFilterProps) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [size, setSize] = useState('10');
  const [ascending, setAscending] = useState(false);

  const handleSearch = () => {
    onFilter({
      id,
      name,
      description,
      value,
      size,
      ascending
    });
  };

  return (
    <section id="salon-service-filter-section">
      <article id='filter-icon'></article>
      
      <InputDefault 
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder='Id'
      />
      
      <InputDefault 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Nome'
      />
      
      <InputDefault 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Descrição'
      />

      <InputDefault 
        value={value.toString()}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Preço'
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
        innerText='+ Adicionar'
        onClick={onAdd} 
      />
      
      <ButtonDefault 
        innerText='Deletar'
        onClick={onDelete}
      />

    </section>
  );
}