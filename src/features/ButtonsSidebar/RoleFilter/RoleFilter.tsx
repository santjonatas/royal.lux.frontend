import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault'
import InputDefault from '../../../components/inputs/InputDefault/InputDefault'
import './RoleFilter.css'

export default function RoleFilter() {

    return (
        <section id="role-filter-section">
            <article id='filter-icon'></article>
            <section id='filters'>
                <InputDefault value='' placeholder='Id'></InputDefault>
                <InputDefault value='' placeholder='Função'></InputDefault>
                <InputDefault value='' placeholder='Detalhes'></InputDefault>
                <ButtonDefault innerText='Buscar'></ButtonDefault>
            </section>
            <section id='actions'>
                <ButtonDefault innerText='Adicionar'/>
                <ButtonDefault innerText='Deletar'/>
            </section>
        </section>
    )
}