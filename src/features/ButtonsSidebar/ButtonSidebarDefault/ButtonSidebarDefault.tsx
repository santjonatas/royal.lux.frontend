import './ButtonSidebarDefault.css';

interface ButtonSidebarDefaultProps {
    name: string;
    pathImage: string;
    onClick?: () => void;
}

export default function ButtonSidebarDefault({ name, pathImage, onClick }: ButtonSidebarDefaultProps) {
    return (
        <button id="button-sidebar-default-component" onClick={onClick}>
            <img className="img-button" src={pathImage} alt={name} />
            <h4 className="name-button">{name}</h4>
        </button>
    );
}
