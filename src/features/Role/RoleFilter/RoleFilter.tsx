import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault'
import InputDefault from '../../../components/inputs/InputDefault/InputDefault'
import SelectBoxOrderFilter from '../../ButtonsSidebar/SelectBoxOrderFilter/SelectBoxOrderFilter'
import './RoleFilter.css'

export default function RoleFilter() {

    return (
        <section id="role-filter-section">
            <article id='filter-icon'></article>
            <section id='filters'>
                <InputDefault value='' placeholder='Id'></InputDefault>
                <InputDefault value='' placeholder='Função'></InputDefault>
                <InputDefault value='' placeholder='Detalhes'></InputDefault>

                <InputDefault value='' placeholder='Quantidade por página'></InputDefault>
                <SelectBoxOrderFilter></SelectBoxOrderFilter>

                <ButtonDefault innerText='Buscar'></ButtonDefault>
            </section>
            <section id='actions-filter'>
                <ButtonDefault innerText='Adicionar'/>
                <ButtonDefault innerText='Deletar'/>
            </section>
        </section>
    )
}