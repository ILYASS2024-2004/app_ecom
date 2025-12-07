import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';

function App() {
  // On gérera l'état de l'utilisateur ici plus tard
  const [user, setUser] = useState(null); 

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;