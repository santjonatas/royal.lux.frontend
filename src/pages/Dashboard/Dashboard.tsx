import { useEffect, useState } from 'react';
import Header from '../../layouts/Header/Header';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Começa ABERTO

    useEffect(() => {
        document.title = "Dashboard | Royal Lux";
    }, []);

    // Função para alternar o menu
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div id="div-dashboard-page">
            <div id="aba-sidebar" className={sidebarOpen ? "" : "closed"}>
                <Sidebar />
            </div>
            <div id="aba-dashboard">
                <Header toggleSidebar={toggleSidebar} />
                <main id="main-dashboard">
                    <h1>eu sla</h1>
                </main>
            </div>
        </div>
    );
}
