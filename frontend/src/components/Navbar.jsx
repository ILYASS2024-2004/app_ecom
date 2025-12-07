import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        🛒 ShopSimple
      </Link>

      {/* Liens */}
      <div className="flex items-center gap-4">
        {user ? (
            // Si connecté
          <>
            <span className="text-gray-700">Bonjour, {user.name}</span>
            {user.role === "ADMIN" && (
              <Link to="/admin" className="text-blue-500 hover:text-blue-700 font-semibold">
                Admin Panel
              </Link>
            )}
            <button 
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
            // Si pas connecté
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;