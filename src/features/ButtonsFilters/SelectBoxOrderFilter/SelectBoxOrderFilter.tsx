import './SelectBoxOrderFilter.css';

interface SelectBoxOrderFilterProps {
  value: boolean; 
  onChange: (isAscending: boolean) => void;
}

export default function SelectBoxOrderFilter({ value, onChange }: SelectBoxOrderFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value === 'asc');
  };

  return (
    <button id="select-box-order-filter">
      <select 
        className="select-order" 
        value={value ? 'asc' : 'desc'} 
        onChange={handleChange}
      >
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
    </button>
  );
}