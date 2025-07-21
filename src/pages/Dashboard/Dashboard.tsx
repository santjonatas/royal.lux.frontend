import { useEffect, useState } from 'react';
import Header from '../../layouts/Header/Header';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import './Dashboard.css';

import Roles from '../../layouts/Role/Roles/Roles';
import RoleAdd from '../../layouts/Role/RoleAdd/RoleAdd';

export default function Dashboard() {
    useEffect(() => {
        document.title = "Dashboard | Royal Lux";
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.location.href = "/login"; 
        }
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState(true); 
    const [currentPage, setCurrentPage] = useState("home");

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const renderPage = () => {
        switch (currentPage) {
            // case "home":
            //     return <DashboardHome />;
            // case "users":
            //     return <Users />;


            // case 'roles':
            case "roles":
                return <Roles goToAddPage={() => setCurrentPage("roleAdd")} />;
            case "roleAdd":
                return <RoleAdd />;


            // case "customerServices":
            //     return <CustomerServices />;
            // case "services":
            //     return <Services />;
            // case "materials":
            //     return <Materials />;
            default:
                return <h1>Página não encontrada</h1>;
        }
    };

    return (
        <div id="div-dashboard-page">
            <div id="aba-sidebar" className={sidebarOpen ? "" : "closed"}>
                <Sidebar setCurrentPage={setCurrentPage} />
            </div>
            <div id="aba-dashboard">
                <Header toggleSidebar={toggleSidebar} />
                <main id="main-dashboard">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
