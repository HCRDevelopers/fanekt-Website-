import React from "react";
import { FaCreditCard, FaEuroSign } from "react-icons/fa";

const RechargeSection = ({
  rechargeAmount,
  setRechargeAmount,
  onRecharge,
  isProcessingRecharge
}) => {
  const quickAmounts = [5, 10, 25, 50];

  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl md:p-6 p-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-blue-400 text-2xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-bold">Important Notice</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300">
            <strong className="text-white">Deposit Only:</strong> Fans can only add funds to their FNKT wallet. Withdrawals are not available.
          </p>
          <p className="text-gray-300">
            <strong className="text-white">Secure Payments:</strong> All transactions are processed securely through Stripe with bank-level encryption.
          </p>
          <p className="text-gray-300">
            <strong className="text-white">Instant Conversion:</strong> Your euro payment is instantly converted to FNKT at the rate of 1€ = 100 FNKT.
          </p>
        </div>
      </div>

      {/* Recharge Form */}
      <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-8 p-2">
        <div className="text-center mb-8">
          <FaCreditCard className="text-[#f64c68] text-4xl mx-auto mb-4" />
          <h3 className="text-white text-2xl font-bold mb-2">Recharge Your FNKT Wallet</h3>
          <p className="text-gray-400">Add funds to earn and redeem FNKT rewards</p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Enter Amount (€)</label>
            <div className="relative">
              <FaEuroSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-12 pr-4 py-4 bg-[#1e2139] border border-[#286db24c] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#f64c68] transition-colors"
              />
            </div>
          </div>

          {/* Amount Preview */}
          {rechargeAmount && parseFloat(rechargeAmount) > 0 && (
            <div className="bg-[#1e2139] rounded-xl p-4 mb-6 border border-[#286db24c]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Amount to Pay:</span>
                <span className="text-white font-semibold">€{parseFloat(rechargeAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">FNKT to Receive:</span>
                <span className="text-[#f64c68] font-bold">{(parseFloat(rechargeAmount) * 100).toLocaleString()} FNKT</span>
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">
                Rate: 1€ = 100 FNKT
              </div>
            </div>
          )}

          {/* Recharge Button */}
          <button
            onClick={onRecharge}
            disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0 || isProcessingRecharge}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
              !rechargeAmount || parseFloat(rechargeAmount) <= 0 || isProcessingRecharge
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#f64c68] to-[#ff6b6b] text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isProcessingRecharge ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaCreditCard />
                Pay with Stripe
              </div>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-6 bg-[#1e2139] rounded-xl p-4 border border-[#286db24c]">
            <div className="flex items-start gap-3">
              <div className="text-green-400 mt-1 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Secure Payment Processing</h4>
                <p className="text-gray-300 text-sm">
                  Your payment information is securely processed by Stripe. We never store your card details on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Minimum Amount Notice */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Minimum recharge amount: €1.00 (100 FNKT)
            </p>
          </div>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl md:p-6 p-2">
        <h4 className="text-white font-semibold mb-4 text-center">Quick Recharge Amounts</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setRechargeAmount(amount.toString())}
              className="p-4 bg-[#1e2139] border border-[#286db24c] rounded-xl hover:border-[#f64c68] transition-colors"
            >
              <div className="text-center">
                <div className="text-white font-bold text-lg">€{amount}</div>
                <div className="text-gray-400 text-sm">{amount * 100} FNKT</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RechargeSection; 

