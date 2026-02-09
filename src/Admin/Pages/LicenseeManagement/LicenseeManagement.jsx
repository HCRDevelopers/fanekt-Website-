import React, { useState, useEffect } from 'react'

const LicenseeManagement = () => {
  const [licensees, setLicensees] = useState([])
  const [selectedLicensee, setSelectedLicensee] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock data for licensees
  const mockLicensees = [
    {
      id: 1,
      name: 'FC Barcelona',
      type: 'Club',
      licenses: [
        { 
          id: 1, 
          licenseNumber: 'FCB-APP-001', 
          type: 'Apparel', 
          status: 'Active', 
          price: 25.00, 
          currency: 'FNKT',
          guardianName: 'Maria Rodriguez',
          associatedPerson: 'Lionel Messi',
          isActive: true
        },
        { 
          id: 2, 
          licenseNumber: 'FCB-EXP-002', 
          type: 'Experience', 
          status: 'Active', 
          price: 50.00, 
          currency: 'FNKT',
          guardianName: 'Juan Perez',
          associatedPerson: 'Sergio Busquets',
          isActive: true
        },
        { 
          id: 3, 
          licenseNumber: 'FCB-EXP-003', 
          type: 'Experience', 
          status: 'Pending', 
          price: 100.00, 
          currency: 'FNKT',
          guardianName: 'Ana Martinez',
          associatedPerson: 'Gerard Pique',
          isActive: false
        }
      ]
    },
    {
      id: 2,
      name: 'Manchester United',
      type: 'Club',
      licenses: [
        { 
          id: 4, 
          licenseNumber: 'MU-APP-004', 
          type: 'Apparel', 
          status: 'Active', 
          price: 30.00, 
          currency: 'FNKT',
          guardianName: 'Sarah Johnson',
          associatedPerson: 'Cristiano Ronaldo',
          isActive: true
        },
        { 
          id: 5, 
          licenseNumber: 'MU-EXP-005', 
          type: 'Experience', 
          status: 'Active', 
          price: 75.00, 
          currency: 'FNKT',
          guardianName: 'David Wilson',
          associatedPerson: 'Paul Pogba',
          isActive: true
        }
      ]
    },
    {
      id: 3,
      name: 'University of Michigan',
      type: 'University',
      licenses: [
        { 
          id: 6, 
          licenseNumber: 'UM-EXP-006', 
          type: 'Experience', 
          status: 'Active', 
          price: 15.00, 
          currency: 'FNKT',
          guardianName: 'Robert Smith',
          associatedPerson: 'John Doe',
          isActive: true
        },
        { 
          id: 7, 
          licenseNumber: 'UM-APP-007', 
          type: 'Apparel', 
          status: 'Active', 
          price: 20.00, 
          currency: 'FNKT',
          guardianName: 'Lisa Thompson',
          associatedPerson: 'Jane Smith',
          isActive: true
        }
      ]
    },
    {
      id: 4,
      name: 'LA Lakers',
      type: 'Team',
      licenses: [
        { 
          id: 8, 
          licenseNumber: 'LAL-EXP-008', 
          type: 'Experience', 
          status: 'Active', 
          price: 200.00, 
          currency: 'FNKT',
          guardianName: 'Michael Johnson',
          associatedPerson: 'LeBron James',
          isActive: true
        },
        { 
          id: 9, 
          licenseNumber: 'LAL-APP-009', 
          type: 'Apparel', 
          status: 'Active', 
          price: 45.00, 
          currency: 'FNKT',
          guardianName: 'Jennifer Davis',
          associatedPerson: 'Anthony Davis',
          isActive: true
        },
        { 
          id: 10, 
          licenseNumber: 'LAL-EXP-010', 
          type: 'Experience', 
          status: 'Pending', 
          price: 80.00, 
          currency: 'FNKT',
          guardianName: 'Thomas Wilson',
          associatedPerson: 'Russell Westbrook',
          isActive: false
        }
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLicensees(mockLicensees)
      setLoading(false)
    }, 1000)
  }, [])

  const handleManageLicenses = (licensee) => {
    setSelectedLicensee(licensee)
  }

  const handleAddLicense = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLicenseToggle = (licenseId) => {
    setLicensees(prevLicensees =>
      prevLicensees.map(licensee =>
        licensee.id === selectedLicensee.id
          ? {
              ...licensee,
              licenses: licensee.licenses.map(license =>
                license.id === licenseId
                  ? { ...license, isActive: !license.isActive }
                  : license
              )
            }
          : licensee
      )
    )
    
    setSelectedLicensee(prev => ({
      ...prev,
      licenses: prev.licenses.map(license =>
        license.id === licenseId
          ? { ...license, isActive: !license.isActive }
          : license
      )
    }))
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '#10b981'
      case 'pending':
        return '#f59e0b'
      case 'expired':
        return '#ef4444'
      default:
        return '#9ca3af'
    }
  }

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'apparel':
        return '#3b82f6'
      case 'experience':
        return '#8b5cf6'
      default:
        return '#9ca3af'
    }
  }

  if (loading) {
    return (
      <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <p className="text-2xl font-medium text-white">Loading...</p>
            <p className="text-[14px] font-medium text-[#ffffff8b]">
              Please wait while we load the licensee data.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:ml-[290px] px-4 lg:px-6 py-3 lg:pb-5 lg:pt-5 pt-28">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-2xl font-medium text-white">Licensee Management</p>
          <p className="text-[14px] font-medium text-[#ffffff8b]">
            Manage licenses for clubs, universities, and teams
          </p>
        </div>
    
      </div>

      {/* License Management Page */}
      {selectedLicensee ? (
        <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Manage Licenses for {selectedLicensee.name}</h2>
              <p className="text-sm text-[#ffffff8b]">View and manage all licenses for this licensee</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedLicensee(null)}
                className="px-4 py-2 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition-all"
              >
                Back to Licensees
              </button>
              <button 
                onClick={handleAddLicense}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium hover:from-blue-700 hover:to-pink-700 transition-all"
              >
                Add New License
              </button>
            </div>
          </div>

          <div className="bg-[#4a4e6a77] backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-[#42527a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#4a4e6a] backdrop-blur-sm border-b border-white/40">
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      License Number
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Guardian Name
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Associated Person
                    </th>
                    <th className="px-4 lg:px-6 py-5 text-center text-white font-medium border-r border-white/30 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLicensee.licenses.map((license) => (
                    <tr key={license.id} className="border-b border-white/20 hover:bg-white/20 transition-colors">
                      <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                        <span className="font-semibold">{license.licenseNumber}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                        <span 
                          className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                            license.type === 'Apparel' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' : 
                            license.type === 'Experience' ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400' : 
                            'bg-gray-500/20 border border-gray-500/30 text-gray-400'
                          }`}
                        >
                          {license.type}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-6 border-r border-white/20 text-center whitespace-nowrap">
                        <span 
                          className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                            license.status === 'Active' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 
                            license.status === 'Pending' ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400' : 
                            'bg-red-500/20 border border-red-500/30 text-red-400'
                          }`}
                        >
                          {license.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                        <span>{license.guardianName}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-6 text-white/90 border-r border-white/20 text-center whitespace-nowrap">
                        <span>{license.associatedPerson}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-6 text-center">
                        <button
                          onClick={() => handleLicenseToggle(license.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            license.isActive 
                              ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
                              : 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                          }`}
                        >
                          {license.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#3135543d] rounded-xl mt-6 border border-[#1584f259] p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {licensees.map((licensee) => (
              <div key={licensee.id} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-xl p-6 hover:transform hover:translate-y-[-4px] hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{licensee.name}</h3>
                    <span className="inline-block px-3 py-1 bg-white/10 border border-white/30 rounded-full text-xs text-white font-medium uppercase tracking-wider">
                      {licensee.type}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleManageLicenses(licensee)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    Manage Licenses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add License Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1d2e] border border-white/30 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white">Add New License</h3>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">License Number</label>
                <input
                  type="text"
                  placeholder="e.g., FCB-APP-011"
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Type</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Apparel">Apparel</option>
                  <option value="Experience">Experience</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Status</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Associated Person</label>
                <input
                  type="text"
                  placeholder="Enter associated person"
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Add License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default LicenseeManagement
