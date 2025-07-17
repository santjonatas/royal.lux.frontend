import './RoleItem.css'

export default function RoleItem() {

    return (
        <section id="role-item">
            <div id='section-checkbox-role-item'>
                <input
                type="checkbox"
                id="checkbox-role-item"
                name="checkbox-role-item"
                // checked={rememberMe}
                // onChange={handleCheckboxChange}
              />
            </div>
            <section id='items'>
                <p className='item-data'>1</p>
                <p className='item-data'>Barbeiro</p>
                <p className='item-data'>Profissional que realiza cortes, barba e cuidados masculinos.</p>
                <p className='item-data'>2025-07-12</p>
                <p className='item-data'>2025-07-15</p>
            </section>
            <section id='actions'>
            </section>
        </section>
    )
}