import './ButtonSidebarDefault.css'

interface ButtonSidebarDefaultProps {
    name: string;
    pathImage: string;
}

export default function ButtonSidebarDefault({name, pathImage} : ButtonSidebarDefaultProps){

    return(
        <button id="button-sidebar-default-component">
            <h4 className="name-button">{name}</h4>
            <img className="img-button" src={pathImage} alt={pathImage}/>
        </button>
    );
}