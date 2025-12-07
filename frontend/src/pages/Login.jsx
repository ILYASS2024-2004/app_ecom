import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  // Fonction appelée quand Google valide la connexion
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      
      console.log("Token Google reçu :", token);

      // 1. On stocke le token dans le navigateur
      // (Notre fichier api.js va le lire automatiquement pour les prochaines requêtes)
      localStorage.setItem("token", token);

      // 2. On appelle notre Backend pour qu'il nous enregistre dans la base de données
      // Grâce à l'intercepteur dans api.js, le token est envoyé dans le Header
      const response = await api.post('/auth/login');
      
      console.log("Utilisateur Backend :", response.data);

      // 3. On met à jour l'utilisateur dans l'application React
      setUser(response.data);

      // 4. Redirection vers la page d'accueil (ou Admin si c'est un admin)
      if (response.data.role === "ADMIN") {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("Erreur lors de la connexion au Backend :", error);
      alert("Erreur de connexion. Vérifie que le Backend est lancé !");
      localStorage.removeItem("token");
    }
  };

  const handleGoogleError = () => {
    console.log('Échec de la connexion Google');
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue ! 👋</h2>
        <p className="text-gray-500 mb-8">Connecte-toi pour accéder à la boutique.</p>
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="pill"
          />
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Sécurité garantie par Google OAuth2
        </p>
      </div>
    </div>
  );
};

export default Login;