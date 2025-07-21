import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault'
import InputDefault from '../../../components/inputs/InputDefault/InputDefault'
import './RoleAdd.css'

export default function RoleAdd() {
    
    return (
        <>
        <article id='roles-header'>
            <h2>Funções</h2>
        </article>
        <form id="main-role-add-page">
            <h3 id="role-add-action-page">Adicionar nova função</h3>
            <div id="div-inputs-role-add">
                <InputDefault 
                    placeholder="Nome" 
                    name="nome" 
                //   value={formDataLogin.username} 
                //   onChange={handleChange} 
                    required>
                </InputDefault>

                <InputDefault 
                    placeholder="Detalhes" 
                    name="detalhes" 
                //   value={formDataLogin.username} 
                //   onChange={handleChange} 
                    required>
                </InputDefault>
            </div>

            <div id="div-buttons-role-add">
                <ButtonDefault innerText="Adicionar" type="submit"></ButtonDefault>
                <ButtonDefault innerText="Cancelar" type="button"></ButtonDefault>
            </div>
        </form>
        </>
    )
}