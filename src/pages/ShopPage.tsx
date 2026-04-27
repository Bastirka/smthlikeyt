import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';
import { Link } from 'react-router-dom';

const ShopPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = mockProducts.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Creator Shop</h1>
        {cart.length > 0 && (
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            🛒 Cart ({cart.length}) - {formatCurrency(cartTotal)}
          </Link>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/shop/${product.id}`} className="block group">
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} transition hover:shadow-lg`}>
              <div className="relative h-40 overflow-hidden bg-gray-300">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.stock} in stock
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(product.price)}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product.id);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
