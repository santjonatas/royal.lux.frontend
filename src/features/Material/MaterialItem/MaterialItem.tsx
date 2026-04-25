import ButtonView from '../../../components/buttons/EditButton/ButtonView';
import './MaterialItem.css'

interface MaterialItemProps {
  id: number;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string | null;
  checked: boolean;
  onSelect: (id: number) => void;
  onView: () => void;
}

export default function MaterialItem({
  id,
  name,
  detail,
  createdAt,
  updatedAt,
  checked,
  onSelect,
  onView
}: MaterialItemProps) {
  return (
    <section id="material-item">
      <div id='section-checkbox-material-item'>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onSelect(id)}
        />
      </div>
      <section id='items'>
        <p className='item-data'>{id}</p>
        <p className='item-data'>{name}</p>
        <p className='item-data'>{detail}</p>
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
