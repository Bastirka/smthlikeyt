import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductManagerProps {
  products?: Product[];
}

const ProductManager: React.FC<ProductManagerProps> = ({ products = [] }) => {
  const { darkMode } = useTheme();
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'apparel',
  });

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct);
    setNewProduct({ name: '', description: '', price: 0, stock: 0, category: 'apparel' });
    setShowAdd(false);
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shop Products</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showAdd ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showAdd && (
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className={`w-full px-4 py-2 rounded mb-2 border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className={`w-full px-4 py-2 rounded mb-2 border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            rows={3}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className={`w-full px-4 py-2 rounded mb-2 border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            className={`w-full px-4 py-2 rounded mb-2 border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
          />
          <button
            onClick={handleAddProduct}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg text-blue-600">{formatCurrency(product.price)}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                Edit
              </button>
              <button className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
