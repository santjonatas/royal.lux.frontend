import './ButtonView.css'

interface ButtonViewProps {
    onClick?: () => void; 
    type?: 'button';
}

export default function ButtonView({onClick, type} : ButtonViewProps){

    return(
        <button id="button-view-component" onClick={onClick} type={type}></button>
    );
}