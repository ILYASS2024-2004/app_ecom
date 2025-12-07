import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      {/* Image du produit */}
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-blue-600">
            {product.price} €
          </span>
          
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert(`Achat de ${product.name} bientôt disponible !`)}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;