import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault'
import './Pagination.css'

export default function Pagination() {

    return (
        <section id="role-pagination">
            <ButtonDefault innerText='1'/>
            <ButtonDefault innerText='2'/>
            <ButtonDefault innerText='3'/>
            <ButtonDefault innerText='4'/>
            <ButtonDefault innerText='5'/>
            <ButtonDefault innerText='Próxima'/>
        </section>
    )
}