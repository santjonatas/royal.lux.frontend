import ButtonEdit from '../../../components/buttons/EditButton/ButtonEdit'
import './RoleItem.css'

interface RoleItemProps {
  id: number;
  name: string;
  detail: string;
  createdAt: string;
  updatedAt: string | null;
}

export default function RoleItem({
  id,
  name,
  detail,
  createdAt,
  updatedAt
}: RoleItemProps) {

    return (
        <section id="role-item">
            <div id='section-checkbox-role-item'>
                <input
                  type="checkbox"
                  id="checkbox-role-item"
                  name="checkbox-role-item"
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
                <ButtonEdit></ButtonEdit>
            </section>
        </section>
    )
}