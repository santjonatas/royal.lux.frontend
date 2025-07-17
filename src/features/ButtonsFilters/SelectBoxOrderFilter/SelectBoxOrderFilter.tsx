import './SelectBoxOrderFilter.css';
import { useState } from 'react';

export default function SelectBoxOrderFilter() {
    const [ascending, setAscending] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAscending(e.target.value === 'asc');
    };

    return (
        <div id="select-box-order-filter">
            <div className="icon-label-container">
                <div className="icon-order" /> 
                <span className="label-order">Ordem</span>
            </div>
            <select className="select-order" value={ascending ? 'asc' : 'desc'} onChange={handleChange}>
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
            </select>
        </div>
    );
}
