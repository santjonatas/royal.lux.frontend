import { useEffect, useState } from 'react';
import Header from '../../layouts/Header/Header';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import './Dashboard.css';

export default function Dashboard() {

    useEffect(() => {
        document.title = "Dashboard | Royal Lux";

        const token = localStorage.getItem("authToken");

        if (!token) {
            window.location.href = "/login"; 
        }
    }, []);

    const [sidebarOpen, setSidebarOpen] = useState(true); 

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
