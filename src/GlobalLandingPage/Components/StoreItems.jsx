import React, { useState } from 'react';

// Mock modal component since StoreItemModal isn't provided
const StoreItemModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full border border-white/20">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                    <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">×</button>
                </div>
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <p className="text-white/80 mb-4">{item.description}</p>
                <div className="space-y-2 mb-6">
                    <p className="text-green-400">FAN€KT price: {item.fanektPrice}</p>
                    <p className="text-white/60">Public price: {item.publicPrice}</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
                    Order Now
                </button>
            </div>
        </div>
    );
};

const items = [
    {
        title: 'SmartPatch',
        description: 'Official NFC-enabled SmartPatch to verify genuine fandom and connect physical items to FANEKT.',
        fanektPrice: 'F̈1,200.00 (€12.00)',
        publicPrice: 'F̈2,400.00 (€24.00)',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
    },
    {
        title: 'White Peace T-Shirt',
        description: 'FANEKT Peace edition T-shirt',
        fanektPrice: 'F̈2,400.00 (€24.00)',
        publicPrice: 'F̈4,800.00 (€48.00)',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
    },
    {
        title: 'Match Set (Jersey+Short+Socks)',
        description: 'Complete match kit',
        fanektPrice: 'F̈3,800.00 (€38.00)',
        publicPrice: 'F̈7,600.00 (€76.00)',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=300&fit=crop'
    },

    {
        title: 'Match Jersey',
        description: 'Official match jersey',
        fanektPrice: 'F̈2,400.00 (€24.00)',
        publicPrice: 'F̈4,800.00 (€48.00)',
        image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=300&h=300&fit=crop'
    },
    {
        title: 'Match Short',
        description: 'Official match short',
        fanektPrice: 'F̈1,800.00 (€18.00)',
        publicPrice: 'F̈3,600.00 (€36.00)',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop'
    },
    {
        title: 'Training Jersey',
        description: 'Training jersey',
        fanektPrice: 'F̈2,000.00 (€20.00)',
        publicPrice: 'F̈4,000.00 (€40.00)',
        image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=300&h=300&fit=crop'
    },
    {
        title: 'Training Short',
        description: 'Training short',
        fanektPrice: 'F̈1,600.00 (€16.00)',
        publicPrice: 'F̈3,200.00 (€32.00)',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop'
    },
    {
        title: 'K-Way Windbreaker',
        description: 'Windproof jacket',
        fanektPrice: 'F̈4,800.00 (€48.00)',
        publicPrice: 'F̈9,600.00 (€96.00)',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop'
    },
    {
        title: 'Backpack',
        description: 'Sports backpack',
        fanektPrice: 'F̈2,400.00 (€24.00)',
        publicPrice: 'F̈4,800.00 (€48.00)',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
    },
    {
        title: 'Track Suit',
        description: 'Full tracksuit',
        fanektPrice: 'F̈4,800.00 (€48.00)',
        publicPrice: 'F̈9,600.00 (€96.00)',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop'
    },
    {
        title: 'Base Layer T-shirt',
        description: 'Thermal base layer T-shirt',
        fanektPrice: 'F̈2,200.00 (€22.00)',
        publicPrice: 'F̈4,400.00 (€44.00)',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop'
    }
];

function StoreItems() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewOrder = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="relative overflow-hidden group">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">
                                {item.title}
                            </h3>

                            <p className="text-white/70 text-sm leading-relaxed min-h-[40px]">
                                {item.description}
                            </p>

                            <div className="space-y-2 py-3 border-t border-white/10">
                                <div>
                                    <p className="text-green-400 font-semibold text-base">
                                        FAN€KT price: {item.fanektPrice}
                                    </p>
                                    <p className="text-white/50 text-xs italic">
                                        (requires verified FAN€KT account)
                                    </p>
                                </div>
                                <p className="text-white/60 text-sm font-medium">
                                    Public price: {item.publicPrice}
                                </p>
                            </div>

                            <button
                                onClick={() => handleViewOrder(item)}
                                className="bg-transparent text-white font-[500] text-lg px-16 py-3 rounded-lg whitespace-nowrap backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center w-full"
                            >
                                View & Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <StoreItemModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    item={selectedItem}
                />
            )}
        </>
    );
}

export default StoreItems;