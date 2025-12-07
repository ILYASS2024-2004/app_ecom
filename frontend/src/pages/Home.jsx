import { useEffect, useState } from 'react';
import api from '../services/api'; // Notre configuration Axios
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect se lance au chargement de la page


  const fetchProducts = async () => {
    try {
      // Appel au Backend (endpoint public qu'on a créé tout à l'heure)
      const response = await api.get('/public/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des produits", error);
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Chargement des produits...</div>;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Nos Produits Récents
      </h1>

      {/* Grille responsive : 1 colonne sur mobile, 3 sur PC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center text-gray-500">Aucun produit trouvé.</div>
      )}
    </div>
  );
};

export default Home;