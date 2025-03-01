import { useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import './Dashboard.css'

export default function Dashboard(){

    useEffect(() => {
        document.title = "Dashboard | Royal Lux";
      }, []); 

    return(
        <div id="div-dashboard-page">
            <div id="aba-sidebar">
                <Sidebar></Sidebar>
            </div>
            <div id="aba-dashboard">
                <Header></Header>
                <main id="main-dashboard">
                    <h1>eu sla</h1>
                </main>
            </div>
        </div>
    );
}