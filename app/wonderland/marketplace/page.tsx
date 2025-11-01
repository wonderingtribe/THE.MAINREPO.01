'use client';

import React, { useState } from 'react';
import { WonderlandLayout } from '@/components/layouts/WonderlandLayout';
import { FiSearch, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const products = [
    { id: 1, name: 'AI Image Pro', price: 29.99, rating: 4.8, reviews: 124, category: 'Tools', image: '🎨' },
    { id: 2, name: 'ChatBot Elite', price: 49.99, rating: 4.9, reviews: 256, category: 'Bots', image: '💬' },
    { id: 3, name: 'Voice Master', price: 39.99, rating: 4.7, reviews: 89, category: 'Audio', image: '🎤' },
    { id: 4, name: 'Data Analyzer', price: 59.99, rating: 4.6, reviews: 145, category: 'Analytics', image: '📊' },
    { id: 5, name: 'Code Assistant', price: 44.99, rating: 4.9, reviews: 312, category: 'Development', image: '💻' },
    { id: 6, name: 'Text Generator', price: 34.99, rating: 4.7, reviews: 198, category: 'Writing', image: '✍️' },
    { id: 7, name: 'Video Creator', price: 69.99, rating: 4.8, reviews: 167, category: 'Media', image: '🎬' },
    { id: 8, name: 'Music Composer', price: 54.99, rating: 4.6, reviews: 92, category: 'Audio', image: '🎵' },
    { id: 9, name: 'Design Helper', price: 39.99, rating: 4.9, reviews: 234, category: 'Design', image: '🎨' },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <WonderlandLayout>
      {/* Tie-dye Wonderland Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 animate-gradient">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Wonderland Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing AI tools and services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                <option value="tools">Tools</option>
                <option value="bots">Bots</option>
                <option value="audio">Audio</option>
                <option value="analytics">Analytics</option>
                <option value="development">Development</option>
                <option value="writing">Writing</option>
                <option value="media">Media</option>
                <option value="design">Design</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Prices</option>
                <option value="under30">Under $30</option>
                <option value="30to50">$30 - $50</option>
                <option value="over50">Over $50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Product Image/Icon */}
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-12 flex items-center justify-center">
                <div className="text-8xl">{product.image}</div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <span className="text-sm text-purple-600 font-medium">
                      {product.category}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-pink-50 rounded-full transition-colors">
                    <FiHeart className="text-pink-500" size={20} />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-600">
                    ${product.price}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                    <FiShoppingCart size={18} />
                    <span className="font-semibold">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </WonderlandLayout>
  );
}
