import './SalonServiceHeader.css'

export default function SalonServiceHeader() {

    return (
        <section id="salon-service-header">
            <div id='align-header-1'></div>
            <section id='columns-header'>
                <p className='item-column'>Id</p>
                <p className='item-column'>Nome</p>
                <p className='item-column'>Preço</p>
                <p className='item-column'>Criado em</p>
                <p className='item-column'>Alterado em</p>
            </section>
            <section id='align-header-2'>
            </section>
        </section>
    )
}