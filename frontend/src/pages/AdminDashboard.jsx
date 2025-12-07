import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  // Charger les produits au démarrage


  const fetchProducts = async () => {
    try {
      const response = await api.get('/public/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur chargement produits", error);
    }
  };
    useEffect(() => {
    fetchProducts();
  }, []);

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // AJOUTER un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      alert("Produit ajouté avec succès !");
      setFormData({ name: '', price: '', description: '', imageUrl: '' }); // Reset form
      fetchProducts(); // Recharger la liste
    } catch (error) {
      console.error("Erreur ajout", error);
      alert("Erreur lors de l'ajout.");
    }
  };

  // SUPPRIMER un produit
  const handleDelete = async (id) => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ce produit ?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts(); // Recharger la liste
      } catch (error) {
        console.error("Erreur suppression", error);
      }
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- FORMULAIRE D'AJOUT (1/3 de la largeur) --- */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Ajouter un produit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required 
                className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." required 
                className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required 
                className="w-full border p-2 rounded mt-1 h-24"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              + Ajouter le produit
            </button>
          </form>
        </div>

        {/* --- LISTE DES PRODUITS (2/3 de la largeur) --- */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Liste des produits ({products.length})</h2>
          
          {products.map((product) => (
            <div key={product.id} className="flex bg-white p-4 rounded-xl shadow-sm items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-blue-600 font-semibold">{product.price} €</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(product.id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
              >
                Supprimer 🗑️
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;