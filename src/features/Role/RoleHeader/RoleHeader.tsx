import './RoleHeader.css'

export default function RoleHeader() {

    return (
        <section id="role-header">
            <div id='align-header-1'></div>
            <section id='columns-header'>
                <p className='item-column'>Id</p>
                <p className='item-column'>Nome</p>
                <p className='item-column'>Detalhes</p>
                <p className='item-column'>Criado em</p>
                <p className='item-column'>Alterado em</p>
            </section>
            <section id='align-header-2'>
            </section>
        </section>
    )
}