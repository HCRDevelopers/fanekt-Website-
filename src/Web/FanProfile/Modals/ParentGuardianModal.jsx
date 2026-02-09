import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Shield, Users, Calendar, Mail, Phone, IdCard, Save, X } from "lucide-react";

const ParentGuardianModal = ({ isOpen, onClose, onSave, licenseeData }) => {
  const [guardianInfo, setGuardianInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    relationship: 'Parent',
    idNumber: '',
    consentGiven: false
  });

  const [licenseeInfo, setLicenseeInfo] = useState({
    name: '',
    email: '',
    age: '',
    licenseNumber: '',
    clubName: '',
    preferredSport: ''
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleGuardianChange = (field, value) => {
    setGuardianInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleLicenseeChange = (field, value) => {
    setLicenseeInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateGuardianForm = () => {
    const required = ['name', 'email', 'phone', 'address', 'relationship', 'idNumber'];
    const missing = required.filter(field => !guardianInfo[field]);
    return missing.length === 0 && guardianInfo.consentGiven;
  };

  const validateLicenseeForm = () => {
    const required = ['name', 'email', 'age', 'licenseNumber', 'clubName', 'preferredSport'];
    const missing = required.filter(field => !licenseeInfo[field]);
    return missing.length === 0;
  };

  const handleSaveGuardian = () => {
    if (validateGuardianForm()) {
      setStep(2);
    }
  };

  const handleSaveLicensee = async () => {
    if (validateLicenseeForm()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const data = {
          guardian: guardianInfo,
          licensee: licenseeInfo,
          timestamp: new Date().toISOString()
        };
        
        onSave(data);
        onClose();
      } catch (error) {
        console.error("Error saving licensee data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#2a2d4a] to-[#333759] rounded-2xl border border-[#286db24c] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#286db24c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserPlus className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add Licensee</h2>
                <p className="text-gray-400 text-sm">Parent/Guardian and Licensee Information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-white" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-4">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === 1 ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                1
              </div>
              <span className="font-medium">Guardian Info</span>
            </div>
            <div className="flex-1 h-1 bg-gray-600 rounded-full">
              <div className={`h-1 rounded-full transition-all ${
                step === 2 ? 'w-full bg-blue-500' : 'w-0'
              }`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                2
              </div>
              <span className="font-medium">Licensee Info</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="text-blue-400" />
                  <h3 className="text-white font-semibold">Guardian Information</h3>
                </div>
                <p className="text-gray-400 text-sm">Please provide the guardian's information. This person will be responsible for the underage licensee.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={guardianInfo.name}
                    onChange={(e) => handleGuardianChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter guardian's full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={guardianInfo.email}
                    onChange={(e) => handleGuardianChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter guardian's email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={guardianInfo.phone}
                    onChange={(e) => handleGuardianChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Relationship *</label>
                  <select
                    value={guardianInfo.relationship}
                    onChange={(e) => handleGuardianChange('relationship', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Address *</label>
                <textarea
                  value={guardianInfo.address}
                  onChange={(e) => handleGuardianChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter full address including street, city, state, and zip code"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">ID Number *</label>
                <input
                  type="text"
                  value={guardianInfo.idNumber}
                  onChange={(e) => handleGuardianChange('idNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter government-issued ID number"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
                <input
                  type="checkbox"
                  checked={guardianInfo.consentGiven}
                  onChange={(e) => handleGuardianChange('consentGiven', e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-2"
                />
                <div>
                  <label className="text-white font-medium">I confirm that I am the legal guardian</label>
                  <p className="text-gray-400 text-sm mt-1">
                    By checking this box, I confirm that I am the legal guardian of the underage person 
                    and I give my consent for them to use this platform under my supervision.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGuardian}
                  disabled={!validateGuardianForm()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue to Licensee Info
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-green-400" />
                  <h3 className="text-white font-semibold">Licensee Information</h3>
                </div>
                <p className="text-gray-400 text-sm">Please provide the underage licensee's information. This person must be under 18 years old.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Licensee Full Name *</label>
                  <input
                    type="text"
                    value={licenseeInfo.name}
                    onChange={(e) => handleLicenseeChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter licensee's full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Licensee Email *</label>
                  <input
                    type="email"
                    value={licenseeInfo.email}
                    onChange={(e) => handleLicenseeChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter licensee's email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Age *</label>
                  <input
                    type="number"
                    value={licenseeInfo.age}
                    onChange={(e) => handleLicenseeChange('age', e.target.value)}
                    min="0"
                    max="17"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter age (must be under 18)"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">License Number *</label>
                  <input
                    type="text"
                    value={licenseeInfo.licenseNumber}
                    onChange={(e) => handleLicenseeChange('licenseNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter official license number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Club/Team Name *</label>
                  <input
                    type="text"
                    value={licenseeInfo.clubName}
                    onChange={(e) => handleLicenseeChange('clubName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter club or team name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Preferred Sport *</label>
                  <input
                    type="text"
                    value={licenseeInfo.preferredSport}
                    onChange={(e) => handleLicenseeChange('preferredSport', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Enter preferred sport"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">Important Information</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• The licensee must be under 18 years old</li>
                  <li>• The license number must be verified with the club</li>
                  <li>• The guardian is responsible for all activities</li>
                  <li>• Licensees get special pricing and benefits</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Back to Guardian Info
                </button>
                <button
                  onClick={handleSaveLicensee}
                  disabled={loading || !validateLicenseeForm()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ParentGuardianModal;