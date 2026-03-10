import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiMapPin, FiPhone, FiClock, FiStar, FiEdit2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

interface Store {
    id?: string;
    name: string;
    pincode: string;
    address: string;
    phone: string;
    lat: number;
    lng: number;
    google_maps_url?: string;
    rating: number;
    hours: string;
    products: string[];
}

const AdminStoreSettings: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newStore, setNewStore] = useState<Store>({
        name: "",
        pincode: "",
        address: "",
        phone: "",
        lat: 0,
        lng: 0,
        google_maps_url: "",
        rating: 4.5,
        hours: "9:00 AM - 8:00 PM",
        products: []
    });

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('store_locations').select('*').order('created_at', { ascending: true });
        if (error) {
            console.error("Error fetching stores:", error);
            // toast.error("Failed to load stores"); 
        } else {
            setStores(data || []);
        }
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isNew: boolean, id?: string) => {
        const { name, value } = e.target;
        if (isNew) {
            setNewStore({ ...newStore, [name]: value });
        } else if (id) {
            setStores(stores.map(store => store.id === id ? { ...store, [name]: value } : store));
        }
    };

    const handleProductsChange = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, id?: string) => {
        const productsArray = e.target.value.split(',').map(p => p.trim());
        if (isNew) {
            setNewStore({ ...newStore, products: productsArray });
        } else if (id) {
            setStores(stores.map(store => store.id === id ? { ...store, products: productsArray } : store));
        }
    };

    const handleAddStore = async () => {
        if (!newStore.name || !newStore.address || !newStore.pincode) {
            toast.error("Name, Address and Pincode are required");
            return;
        }

        const { data, error } = await supabase.from('store_locations').insert([newStore]).select();
        if (error) {
            toast.error("Failed to add store: " + error.message);
        } else {
            toast.success("Store added successfully");
            setStores([...stores, data[0]]);
            setNewStore({
                name: "",
                pincode: "",
                address: "",
                phone: "",
                lat: 0,
                lng: 0,
                google_maps_url: "",
                rating: 4.5,
                hours: "9:00 AM - 8:00 PM",
                products: []
            });
        }
    };

    const handleUpdateStore = async (id: string) => {
        const storeToUpdate = stores.find(s => s.id === id);
        if (!storeToUpdate) return;

        const { error } = await supabase.from('store_locations').update(storeToUpdate).eq('id', id);
        if (error) {
            toast.error("Failed to update store: " + error.message);
        } else {
            toast.success("Store updated successfully");
            setIsEditing(null);
        }
    };

    const handleDeleteStore = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this store?")) return;

        const { error } = await supabase.from('store_locations').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete store: " + error.message);
        } else {
            toast.success("Store deleted successfully");
            setStores(stores.filter(s => s.id !== id));
        }
    };

    return (
        <div className="bg-[#fffaf1] rounded-[20px] shadow-premium border border-[#eadfcc] p-6 lg:p-8 mt-8">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[#eadfcc] flex items-center gap-2 text-[#143d29]">
                <span className="w-2 h-6 bg-[#143d29] rounded-full"></span>
                Store Locations Configuration
            </h2>

            {/* Existing Stores List */}
            <div className="space-y-6 mb-10">
                {loading ? (
                    <p className="text-[#5f4b3b]">Loading stores...</p>
                ) : stores.length === 0 ? (
                    <p className="text-[#5f4b3b] italic">No stores configured yet.</p>
                ) : (
                    stores.map(store => (
                        <motion.div
                            key={store.id}
                            layout
                            className="bg-white p-6 rounded-xl border border-[#eadfcc] shadow-sm relative group"
                        >
                            {isEditing === store.id ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Store Name</label>
                                        <input type="text" name="name" value={store.name} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Pincode</label>
                                        <input type="text" name="pincode" value={store.pincode} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Full Address</label>
                                        <input type="text" name="address" value={store.address} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Phone</label>
                                        <input type="text" name="phone" value={store.phone} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Hours</label>
                                        <input type="text" name="hours" value={store.hours} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Latitude</label>
                                        <input type="number" name="lat" value={store.lat} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Longitude</label>
                                        <input type="number" name="lng" value={store.lng} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Google Maps Link</label>
                                        <input type="text" name="google_maps_url" value={store.google_maps_url || ''} onChange={(e) => handleInputChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Products</label>
                                        <input type="text" name="products" value={store.products?.join(', ')} onChange={(e) => handleProductsChange(e, false, store.id)} className="w-full p-2 border rounded" />
                                    </div>

                                    <div className="flex gap-2 mt-2 md:col-span-2">
                                        <button onClick={() => handleUpdateStore(store.id!)} className="bg-[#143d29] text-white px-4 py-2 rounded text-sm hover:bg-[#0f2e1f]">Save Changes</button>
                                        <button onClick={() => setIsEditing(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-[#143d29] flex items-center gap-2">
                                                {store.name}
                                                <span className="text-xs font-normal bg-[#eadfcc] px-2 py-0.5 rounded text-[#5f4b3b]">{store.pincode}</span>
                                            </h3>
                                            <p className="text-[#5f4b3b] mt-1 flex items-start gap-2"><FiMapPin className="mt-1 flex-shrink-0" /> {store.address}</p>
                                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#5f4b3b]">
                                                <span className="flex items-center gap-1"><FiPhone /> {store.phone}</span>
                                                <span className="flex items-center gap-1"><FiClock /> {store.hours}</span>
                                                <span className="flex items-center gap-1"><FiStar className="text-yellow-500" /> {store.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setIsEditing(store.id!)} className="p-2 text-[#143d29] hover:bg-[#f6efe6] rounded"><FiEdit2 /></button>
                                            <button onClick={() => handleDeleteStore(store.id!)} className="p-2 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Add New Store Form */}
            <div className="bg-[#f6efe6] p-6 rounded-xl border border-[#eadfcc]">
                <h3 className="font-bold text-[#143d29] mb-4 flex items-center gap-2"><FiPlus /> Add New Store</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Store Name <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={newStore.name} onChange={(e) => handleInputChange(e, true)} placeholder="e.g. Srinivasa Home Comfort" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Pincode <span className="text-red-500">*</span></label>
                        <input type="text" name="pincode" value={newStore.pincode} onChange={(e) => handleInputChange(e, true)} placeholder="e.g. 600091" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Full Address <span className="text-red-500">*</span></label>
                        <input type="text" name="address" value={newStore.address} onChange={(e) => handleInputChange(e, true)} placeholder="Shop No, Street, Area, City" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Phone Number</label>
                        <input type="text" name="phone" value={newStore.phone} onChange={(e) => handleInputChange(e, true)} placeholder="e.g. 98765 43210" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Operating Hours</label>
                        <input type="text" name="hours" value={newStore.hours} onChange={(e) => handleInputChange(e, true)} placeholder="e.g. 9:00 AM - 9:00 PM" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Direct Google Maps Link</label>
                        <input type="text" name="google_maps_url" value={newStore.google_maps_url || ''} onChange={(e) => handleInputChange(e, true)} placeholder="https://maps.app.goo.gl/..." className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                        <p className="text-xs text-gray-500 mt-1">Paste the full "Share" link from Google Maps</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Latitude (Optional)</label>
                            <input type="number" name="lat" value={newStore.lat} onChange={(e) => handleInputChange(e, true)} placeholder="12.97" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Longitude (Optional)</label>
                            <input type="number" name="lng" value={newStore.lng} onChange={(e) => handleInputChange(e, true)} placeholder="80.22" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Store Rating</label>
                        <input type="number" name="rating" value={newStore.rating} onChange={(e) => handleInputChange(e, true)} placeholder="4.5" step="0.1" max="5" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1 text-[#5f4b3b]">Available Products</label>
                        <input type="text" name="products" value={newStore.products?.join(', ')} onChange={(e) => handleProductsChange(e, true)} placeholder="Mattress, Pillows, Protectors (comma separated)" className="w-full p-3 border border-[#eadfcc] rounded-lg focus:ring-2 focus:ring-[#143d29] outline-none" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={handleAddStore} className="bg-[#143d29] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#0f2e1f] transition-all flex items-center gap-2">
                        <FiPlus /> Add Store
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminStoreSettings;
