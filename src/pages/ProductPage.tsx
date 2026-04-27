import React from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const { darkMode } = useTheme();
  const [quantity, setQuantity] = React.useState(1);

  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(i => (
            <img key={i} src={product.image} alt={`View ${i}`} className="w-full rounded cursor-pointer hover:opacity-80" />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={i <= Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-500'}>
                ⭐
              </span>
            ))}
          </div>
          <span className="text-gray-500">({product.reviews} reviews) • {product.sales} sold</span>
        </div>

        <p className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatCurrency(product.price)}
        </p>

        <p className={`text-gray-500 mb-6 ${darkMode ? 'text-gray-400' : ''}`}>{product.description}</p>

        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-sm text-gray-500 mb-1">Stock Available</p>
          <p className={`text-lg font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className={`flex items-center border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              −
            </button>
            <span className="px-6 py-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hood:bg-blue-700 transition font-bold text-lg">
            Add to Cart
          </button>
        </div>

        <button className={`w-full py-3 rounded-lg border-2 font-bold transition ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}>
          ❤️ Add to Wishlist
        </button>

        {/* Product Info */}
        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="font-bold mb-4">Product Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-semibold capitalize">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Creator</span>
              <span className="font-semibold">{product.creatorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rating</span>
              <span className="font-semibold">{product.rating} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Sales</span>
              <span className="font-semibold">{product.sales.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
