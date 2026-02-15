import ButtonView from '../../../components/buttons/EditButton/ButtonView';
import './SalonServiceItem.css'

interface SalonServiceItemProps {
  id: number;
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string | null;
  checked: boolean;
  onSelect: (id: number) => void;
  onView: () => void; 
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
  return (
    <section id="role-item">
      <div id='section-checkbox-role-item'>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onSelect(id)}
        />
      </div>
      <section id='items'>
        <p className='item-data'>{id}</p>
        <p className='item-data'>{name}</p>
        <p className='item-data'>{value}</p>
        <p className='item-data'>{new Date(createdAt).toLocaleDateString()}</p>
        <p className='item-data'>
          {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
        </p>
      </section>
      <section id='actions-item'>
        <ButtonView
        onClick={onView}
        />
      </section>
    </section>
  );
}
