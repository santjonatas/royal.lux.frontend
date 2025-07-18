import Pagination from '../../features/ButtonsFilters/Pagination/Pagination'
import RoleFilter from '../../features/Role/RoleFilter/RoleFilter'
import RoleHeader from '../../features/Role/RoleHeader/RoleHeader'
import RoleItem from '../../features/Role/RoleItem/RoleItem'
import './Roles.css'

export default function Roles() {

    return (
        <main id="main-roles-page">
            <article id='roles-header'>
                <h2>Funções</h2>
            </article>
            <section id='roles-filter'>
                <RoleFilter/>
                <RoleHeader/>
            </section>
            <div id='roles-content'>
                <RoleItem/>
                <RoleItem/>
                {/* <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/>
                <RoleItem/> */}
            </div>
            <div id='roles-pagination'>
                <Pagination/>
            </div>
        </main>
    )
}