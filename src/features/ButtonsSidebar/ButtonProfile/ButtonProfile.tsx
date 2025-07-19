import './ButtonProfile.css';
import DefaultProfileImage from "../../../assets/images/icons/profile.png";
import { useState, useEffect } from 'react';

interface ButtonProfileProps {
  nome?: string;
  cargo?: string;
  imagem?: string;
}

interface UserData {
  username?: string;
  role?: string;
  profileImage?: string;
}

export default function ButtonProfile({ 
  nome = "Nome Usuário", 
  cargo = "Cargo", 
  imagem = DefaultProfileImage 
}: ButtonProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) return;

        const data = await response.json();
        setUserData({
          username: data.data.username,
          role: data.data.role,
          profileImage: data.data.profileImage 
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const displayData = {
    nome: userData?.username || nome,
    cargo: userData?.role || cargo,
    imagem: userData?.profileImage || imagem
  };

  return (
    <button id="button-profile-component">
      <div className="div-img-profile">
        <img 
          src={displayData.imagem} 
          alt="Perfil" 
          className="img-profile" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = DefaultProfileImage;
          }}
        />
      </div>
      <div id="div-info-perfil">
        <h3>{displayData.nome}</h3>
        <h4>{displayData.cargo}</h4>
      </div>
      <article id="icon-verify"></article>
    </button>
  );
}