import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault'
import InputDefault from '../../../components/inputs/InputDefault/InputDefault'
import SelectBoxOrderFilter from '../../ButtonsFilters/SelectBoxOrderFilter/SelectBoxOrderFilter'
import './RoleFilter.css'
import './Responsive.css'

export default function RoleFilter() {

    return (
        <section id="role-filter-section">
            <article id='filter-icon'></article>
            
            <InputDefault value='' placeholder='Id'></InputDefault>
            <InputDefault value='' placeholder='Função'></InputDefault>
            <InputDefault value='' placeholder='Detalhes'></InputDefault>

            <div className="icon-label-container">
                <div className="icon-order" /> 
                <span className="label-order">Ordem</span>
            </div>
            <SelectBoxOrderFilter></SelectBoxOrderFilter>
            <InputDefault value='' placeholder='Quantidade'></InputDefault>

            <ButtonDefault innerText='Buscar'></ButtonDefault>

            <ButtonDefault innerText='Adicionar'/>
            <ButtonDefault innerText='Deletar'/>
        </section>
    )
}