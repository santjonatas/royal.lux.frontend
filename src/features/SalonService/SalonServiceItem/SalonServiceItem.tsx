import ButtonView from '../../../components/buttons/EditButton/ButtonView';
import './SalonServiceItem.css'

interface SalonServiceItemProps {
  id: number;
  name: string;
  value: number | string;
  createdAt: string;
  updatedAt: string | null;
  checked: boolean;
  onSelect: (id: number) => void;
  onView: (id: number) => void;
}

export default function SalonServiceItem({
  id,
  name,
  value,
  createdAt,
  updatedAt,
  checked,
  onSelect,
  onView
}: SalonServiceItemProps) {
  const formattedValue = Number(String(value).replace(',', '.'))
    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section id="salon-service-item">
      <div id='section-checkbox-salon-service-item'>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onSelect(id)}
        />
      </div>
      <section id='items'>
        <p className='item-data'>{id}</p>
        <p className='item-data'>{name}</p>
        <p className='item-data'>{formattedValue}</p>
        <p className='item-data'>{new Date(createdAt).toLocaleDateString()}</p>
        <p className='item-data'>
          {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
        </p>
      </section>
      <section id='actions-salon-service-item'>
        <ButtonView
          onClick={() => onView(id)}
        />
      </section>
    </section>
  );
}
