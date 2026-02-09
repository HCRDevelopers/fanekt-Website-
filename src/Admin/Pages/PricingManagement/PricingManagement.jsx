import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Search, Percent, DollarSign, Tag, Edit, Save, X } from "lucide-react";

const PricingManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  const categoryOptions = ["All Categories", "Jerseys", "Shorts", "Shoes", "Accessories", "Equipment"];
  const pricingTiers = [
    { key: 'publicPrice', label: 'Public Price', color: 'bg-red-500', icon: DollarSign },
    { key: 'memberPrice', label: 'FanEKT Member', color: 'bg-blue-500', icon: Tag },
    { key: 'verifiedPrice', label: 'Verified Member', color: 'bg-green-500', icon: Percent },
    { key: 'licenseePrice', label: 'Licensee Price', color: 'bg-purple-500', icon: DollarSign }
  ];

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Official Team Jersey",
      category: "Jerseys",
      baseCost: 15.00,
      publicPrice: 25.00,
      memberPrice: 22.00,
      verifiedPrice: 18.00,
      licenseePrice: 16.00,
      margins: {
        public: 66.7,
        member: 46.7,
        verified: 20.0,
        licensee: 6.7
      }
    },
    {
      id: 2,
      name: "Training Shorts",
      category: "Shorts",
      baseCost: 8.00,
      publicPrice: 15.00,
      memberPrice: 13.00,
      verifiedPrice: 11.00,
      licenseePrice: 10.00,
      margins: {
        public: 87.5,
        member: 62.5,
        verified: 37.5,
        licensee: 25.0
      }
    },
    {
      id: 3,
      name: "Pro Football Shoes",
      category: "Shoes",
      baseCost: 25.00,
      publicPrice: 45.00,
      memberPrice: 40.00,
      verifiedPrice: 35.00,
      licenseePrice: 30.00,
      margins: {
        public: 80.0,
        member: 60.0,
        verified: 40.0,
        licensee: 20.0
      }
    },
    {
      id: 4,
      name: "Team Cap",
      category: "Accessories",
      baseCost: 3.00,
      publicPrice: 8.00,
      memberPrice: 7.00,
      verifiedPrice: 6.00,
      licenseePrice: 5.00,
      margins: {
        public: 166.7,
        member: 133.3,
        verified: 100.0,
        licensee: 66.7
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch)
      );
    }

    if (categoryFilter !== "All Categories") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, products]);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      publicPrice: product.publicPrice,
      memberPrice: product.memberPrice,
      verifiedPrice: product.verifiedPrice,
      licenseePrice: product.licenseePrice
    });
  };

  const handleSave = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              publicPrice: parseFloat(editForm.publicPrice),
              memberPrice: parseFloat(editForm.memberPrice),
              verifiedPrice: parseFloat(editForm.verifiedPrice),
              licenseePrice: parseFloat(editForm.licenseePrice),
              margins: {
                public: ((parseFloat(editForm.publicPrice) - product.baseCost) / product.baseCost) * 100,
                member: ((parseFloat(editForm.memberPrice) - product.baseCost) / product.baseCost) * 100,
                verified: ((parseFloat(editForm.verifiedPrice) - product.baseCost) / product.baseCost) * 100,
                licensee: ((parseFloat(editForm.licenseePrice) - product.baseCost) / product.baseCost) * 100
              }
            }
          : product
      )
    );
    setFilteredProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              publicPrice: parseFloat(editForm.publicPrice),
              memberPrice: parseFloat(editForm.memberPrice),
              verifiedPrice: parseFloat(editForm.verifiedPrice),
              licenseePrice: parseFloat(editForm.licenseePrice),
              margins: {
                public: ((parseFloat(editForm.publicPrice) - product.baseCost) / product.baseCost) * 100,
                member: ((parseFloat(editForm.memberPrice) - product.baseCost) / product.baseCost) * 100,
                verified: ((parseFloat(editForm.verifiedPrice) - product.baseCost) / product.baseCost) * 100,
                licensee: ((parseFloat(editForm.licenseePrice) - product.baseCost) / product.baseCost) * 100
              }
            }
          : product
      )
    );
    setEditingProduct(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatPercentage = (percent) => `${percent.toFixed(1)}%`;

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Pricing Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Manage tiered pricing for all products across different user types
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all shadow-lg">
            <Plus size={20} />
            Bulk Price Update
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition-all shadow-lg">
            <Percent size={20} />
            Apply Discounts
          </button>
        </div>
      </div>

      <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
        <div className="max-w-7xl mx-auto">
          {/* Search + Filters */}
          <div className="flex items-center flex-wrap justify-between mb-6 gap-4">
            <div className="relative">
              <input
                placeholder="Search products by name or category..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-[400px] w-full ps-10 pe-3 py-3 rounded-lg bg-[#ffffff0d] border border-[#42527a] text-white placeholder:text-[#ffffff8b]"
              />
              <Search className="w-[20px] absolute top-3.5 left-3 text-white/60" />
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="px-4 py-3 rounded-lg justify-between bg-[#ffffff0d] border border-white/50 text-white flex items-center gap-3 hover:bg-white/50 transition-all min-w-[180px]"
                >
                  <span>{categoryFilter}</span>
                  <ChevronDown size={20} className={`transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-[#1a1d2e] border border-white/30 rounded-lg shadow-xl z-50 overflow-hidden">
                    {categoryOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCategoryFilter(option);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors ${categoryFilter === option ? "bg-white/10" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Entries Per Page */}
              <div className="relative">
                <button
                  onClick={() => setItemsPerPage(itemsPerPage === 10 ? 25 : 10)}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white flex items-center gap-2 hover:bg-white/20 transition-all min-w-[120px] justify-between"
                >
                  <span className="font-medium">{itemsPerPage} entries</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Public Price Avg</p>
                  <p className="text-white text-2xl font-bold">
                    ${filteredProducts.reduce((acc, p) => acc + p.publicPrice, 0) / filteredProducts.length || 0}
                  </p>
                </div>
                <DollarSign className="text-red-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Member Discount Avg</p>
                  <p className="text-white text-2xl font-bold">
                    {((filteredProducts.reduce((acc, p) => acc + p.memberPrice, 0) / filteredProducts.length) / 
                      (filteredProducts.reduce((acc, p) => acc + p.publicPrice, 0) / filteredProducts.length) * 100).toFixed(0)}%
                  </p>
                </div>
                <Tag className="text-blue-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Licensee Savings</p>
                  <p className="text-white text-2xl font-bold">
                    ${filteredProducts.reduce((acc, p) => acc + (p.publicPrice - p.licenseePrice), 0).toFixed(2)}
                  </p>
                </div>
                <Percent className="text-green-400 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Total Products</p>
                  <p className="text-white text-2xl font-bold">{filteredProducts.length}</p>
                </div>
                <DollarSign className="text-purple-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px]">
                <thead>
                  <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Product
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Base Cost
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Public Price
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Member Price
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Verified Price
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Licensee Price
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <tr key={index} className="border-b border-white/20 animate-pulse">
                        {Array.from({ length: 7 }).map((_, cellIndex) => (
                          <td key={cellIndex} className="px-4 lg:px-6 py-6 border-r border-white/20 text-center">
                            <div className="h-4 bg-white/20 rounded w-24 mx-auto"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-16 text-white/70">
                        <div className="flex flex-col items-center">
                          <DollarSign className="text-6xl text-white/20 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                          <p className="text-sm">No products found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((product, index) => (
                      <tr key={index} className="border-b border-white/20 hover:bg-white/20 transition-colors">
                        {/* Product Info */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <div className="text-left">
                            <p className="font-medium">{product.name}</p>
                            <span className="inline-block mt-1 px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                              {product.category}
                            </span>
                          </div>
                        </td>
                        
                        {/* Base Cost */}
                        <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                          <span className="bg-gray-600 px-2 py-1 rounded text-sm">{formatCurrency(product.baseCost)}</span>
                        </td>

                        {/* Pricing Tiers */}
                        {pricingTiers.map((tier) => (
                          <td key={tier.key} className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                            {editingProduct === product.id ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editForm[tier.key] || product[tier.key]}
                                  onChange={(e) => handleInputChange(tier.key, e.target.value)}
                                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white text-center"
                                />
                                <span className="text-xs text-white/60">
                                  Margin: {formatPercentage(((parseFloat(editForm[tier.key] || product[tier.key]) - product.baseCost) / product.baseCost) * 100)}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${tier.color}`}>
                                  {formatCurrency(product[tier.key])}
                                </span>
                                <span className="text-xs text-white/60">
                                  {formatPercentage(product.margins[tier.key.replace('Price', '')])}
                                </span>
                              </div>
                            )}
                          </td>
                        ))}

                        {/* Actions */}
                        <td className="px-4 lg:px-6 py-6 text-center">
                          {editingProduct === product.id ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleSave(product.id)}
                                className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                              >
                                <Save size={18} className="text-green-400" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <X size={18} className="text-red-400" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <Edit size={18} className="text-blue-400" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex items-center justify-between mt-7 flex-wrap gap-4">
              <div className="text-white/70 text-sm">
                Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === 1 ? "bg-white/5 cursor-not-allowed opacity-50" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const startPage = Math.max(1, currentPage - 2);
                  const endPage = Math.min(totalPages, startPage + 4);
                  const page = startPage + i;
                  
                  if (page <= endPage) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`p-2 rounded-lg border border-white/30 text-white transition-all ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-white/5 cursor-not-allowed opacity-50"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingManagement;