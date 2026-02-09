import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Percent, Tag, Users, Shield, Calendar, Save, X, AlertTriangle } from "lucide-react";

const LicenseePricingModal = ({ isOpen, onClose, product, onSave }) => {
  const [pricing, setPricing] = useState({
    publicPrice: 0,
    memberPrice: 0,
    verifiedPrice: 0,
    licenseePrice: 0
  });
  const [baseCost, setBaseCost] = useState(0);
  const [margins, setMargins] = useState({
    public: 0,
    member: 0,
    verified: 0,
    licensee: 0
  });
  const [loading, setLoading] = useState(false);

  const pricingTiers = [
    { key: 'publicPrice', label: 'Public Price', color: 'bg-red-500', icon: DollarSign },
    { key: 'memberPrice', label: 'FanEKT Member', color: 'bg-blue-500', icon: Tag },
    { key: 'verifiedPrice', label: 'Verified Member', color: 'bg-green-500', icon: Percent },
    { key: 'licenseePrice', label: 'Licensee Price', color: 'bg-purple-500', icon: Users }
  ];

  useEffect(() => {
    if (product) {
      setPricing({
        publicPrice: product.publicPrice || 25.00,
        memberPrice: product.memberPrice || 22.00,
        verifiedPrice: product.verifiedPrice || 18.00,
        licenseePrice: product.licenseePrice || 16.00
      });
      setBaseCost(product.baseCost || 15.00);
    }
  }, [product]);

  useEffect(() => {
    // Calculate margins when pricing changes
    const newMargins = {
      public: baseCost > 0 ? ((pricing.publicPrice - baseCost) / baseCost) * 100 : 0,
      member: baseCost > 0 ? ((pricing.memberPrice - baseCost) / baseCost) * 100 : 0,
      verified: baseCost > 0 ? ((pricing.verifiedPrice - baseCost) / baseCost) * 100 : 0,
      licensee: baseCost > 0 ? ((pricing.licenseePrice - baseCost) / baseCost) * 100 : 0
    };
    setMargins(newMargins);
  }, [pricing, baseCost]);

  const handlePriceChange = (field, value) => {
    setPricing(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleBaseCostChange = (value) => {
    setBaseCost(parseFloat(value) || 0);
  };

  const validatePricing = () => {
    const { publicPrice, memberPrice, verifiedPrice, licenseePrice } = pricing;
    
    // Check if licensee price is the lowest
    const isLicenseeLowest = licenseePrice <= memberPrice && licenseePrice <= verifiedPrice && licenseePrice <= publicPrice;
    
    // Check if prices are in descending order
    const isValidOrder = publicPrice >= memberPrice && memberPrice >= verifiedPrice && verifiedPrice >= licenseePrice;
    
    return {
      isValid: isValidOrder && isLicenseeLowest && baseCost > 0,
      errors: {
        order: !isValidOrder,
        licenseeNotLowest: !isLicenseeLowest,
        baseCost: baseCost <= 0
      }
    };
  };

  const handleSave = async () => {
    const validation = validatePricing();
    if (!validation.isValid) {
      alert("Please fix the pricing validation errors before saving.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = {
        productId: product.id,
        pricing: pricing,
        baseCost: baseCost,
        margins: margins,
        timestamp: new Date().toISOString()
      };
      
      onSave(data);
      onClose();
    } catch (error) {
      console.error("Error saving pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatPercentage = (percent) => `${percent.toFixed(1)}%`;

  if (!isOpen) return null;

  const validation = validatePricing();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#286db24c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <DollarSign className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Pricing Configuration</h2>
                <p className="text-gray-400 text-sm">Set tiered pricing for {product?.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Info */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">{product?.name}</h3>
                <p className="text-gray-400 text-sm">{product?.category}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Base Cost</p>
                <p className="text-white font-bold text-lg">{formatCurrency(baseCost)}</p>
              </div>
            </div>
          </div>

          {/* Validation Errors */}
          {!validation.isValid && (
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-400" />
                <div>
                  <h4 className="text-white font-medium">Pricing Validation Errors</h4>
                  <ul className="text-gray-400 text-sm mt-1 space-y-1">
                    {validation.errors.order && <li>• Prices must be in descending order (Public ≥ Member ≥ Verified ≥ Licensee)</li>}
                    {validation.errors.licenseeNotLowest && <li>• Licensee price must be the lowest</li>}
                    {validation.errors.baseCost && <li>• Base cost must be greater than $0</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Base Cost Input */}
          <div className="mb-8">
            <label className="block text-gray-400 text-sm font-medium mb-3">Base Cost</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={baseCost}
                onChange={(e) => handleBaseCostChange(e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-gray-500 focus:outline-none ${
                  validation.errors.baseCost ? 'border-red-500/50' : 'border-white/30'
                }`}
                placeholder="Enter base cost"
              />
              <DollarSign className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all ${
                  validation.errors.order && (tier.key === 'memberPrice' || tier.key === 'verifiedPrice' || tier.key === 'licenseePrice') 
                    ? 'border-red-500/30 bg-red-500/5' 
                    : 'border-white/30 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${tier.color}`}>
                      <tier.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{tier.label}</h4>
                      <p className="text-gray-400 text-sm">Tier {index + 1}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.key === 'licenseePrice' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/20 text-white'
                  }`}>
                    {tier.key === 'publicPrice' ? 'Highest' : tier.key === 'licenseePrice' ? 'Lowest' : 'Medium'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={pricing[tier.key]}
                      onChange={(e) => handlePriceChange(tier.key, e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none ${
                        validation.errors.order && (tier.key === 'memberPrice' || tier.key === 'verifiedPrice' || tier.key === 'licenseePrice') 
                          ? 'border-red-500/50' : 'border-white/30'
                      }`}
                      placeholder={`Enter ${tier.label} price`}
                    />
                    <DollarSign className="absolute right-3 top-3.5 text-gray-400" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Margin:</span>
                    <span className={`font-semibold ${
                      margins[tier.key.replace('Price', '')] >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPercentage(margins[tier.key.replace('Price', '')])}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Savings vs Public:</span>
                    <span className="text-blue-400 font-semibold">
                      {formatCurrency(pricing.publicPrice - pricing[tier.key])}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
            <h4 className="text-white font-semibold mb-4">Pricing Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Licensee Savings</p>
                <p className="text-purple-400 font-bold text-lg">
                  {formatCurrency(pricing.publicPrice - pricing.licenseePrice)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Licensee Margin</p>
                <p className="text-green-400 font-bold text-lg">
                  {formatPercentage(margins.licensee)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Best Deal</p>
                <p className="text-purple-400 font-bold text-lg">Licensee Price</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Validation</p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  validation.isValid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {validation.isValid ? 'Valid' : 'Invalid'}
                </span>
              </div>
            </div>
          </div>

          {/* Benefits for Licensees */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-yellow-400" />
              <h4 className="text-white font-medium">Licensee Benefits</h4>
            </div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Special discounted pricing for verified licensees</li>
              <li>• Priority access to exclusive merchandise</li>
              <li>• Free equipment program eligibility</li>
              <li>• Enhanced fan experience and rewards</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading || !validation.isValid}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Pricing Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LicenseePricingModal;