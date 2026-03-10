import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSave, FiAlertCircle, FiSettings } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import AdminStoreSettings from "../components/AdminStoreSettings";

interface StoreSettings {
    delivery_fee_standard: number;
    delivery_fee_express: number;
    tax_rate: number;
    support_email: string;
    maintenance_mode: boolean;
}

const AdminSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<StoreSettings>({
        delivery_fee_standard: 0,
        delivery_fee_express: 0,
        tax_rate: 0,
        support_email: "",
        maintenance_mode: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('app_settings')
                    .select('*')
                    .single();

                if (error && error.code !== 'PGRST116') { // Ignore no rows error
                    console.error("Error fetching settings:", error);
                    toast.error("Failed to load settings");
                } else if (data) {
                    setSettings(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Check if row exists first, or use upsert if ID is constant/known
            // For simplicity, we assume a single row with a known ID or we handle upsert logic
            // Since we might not have a table yet, we need to ensure the table exists (Step 3 will handle migration)
            // Here we assume 'id: 1' is the singleton row
            const { error } = await supabase
                .from('app_settings')
                .upsert({ id: 1, ...settings });

            if (error) throw error;
            toast.success("Settings saved successfully");
        } catch (err: any) {
            console.error("Error saving settings:", err);
            toast.error("Failed to save settings: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-[#5f4b3b]">Loading settings...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 sm:p-6 lg:p-8 bg-[#f6efe6] min-h-screen text-[#143d29]"
        >
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-serif font-bold mb-2 flex items-center gap-3">
                        <FiSettings /> Store Settings
                    </h1>
                    <p className="text-[#5f4b3b]">Manage global configurations for your store.</p>
                </header>

                <div className="bg-[#fffaf1] rounded-[20px] shadow-premium border border-[#eadfcc] p-6 lg:p-8">
                    {/* FEES SECTION */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[#eadfcc] flex items-center gap-2">
                            <span className="w-2 h-6 bg-[#143d29] rounded-full"></span>
                            Delivery & Taxes
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#5f4b3b]">Standard Delivery Fee (₹)</label>
                                <input
                                    type="number"
                                    name="delivery_fee_standard"
                                    value={settings.delivery_fee_standard}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-[#eadfcc] bg-white focus:ring-2 focus:ring-[#143d29] outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#5f4b3b]">Express Delivery Fee (₹)</label>
                                <input
                                    type="number"
                                    name="delivery_fee_express"
                                    value={settings.delivery_fee_express}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-[#eadfcc] bg-white focus:ring-2 focus:ring-[#143d29] outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-[#5f4b3b]">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    name="tax_rate"
                                    value={settings.tax_rate}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-[#eadfcc] bg-white focus:ring-2 focus:ring-[#143d29] outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* GENERAL SECTION */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[#eadfcc] flex items-center gap-2">
                            <span className="w-2 h-6 bg-[#143d29] rounded-full"></span>
                            General Configuration
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-[#5f4b3b]">Support Email</label>
                                <input
                                    type="email"
                                    name="support_email"
                                    value={settings.support_email}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-[#eadfcc] bg-white focus:ring-2 focus:ring-[#143d29] outline-none transition-all"
                                    placeholder="support@sleeponix.com"
                                />
                            </div>

                            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#eadfcc]">
                                <div>
                                    <h3 className="font-bold text-[#143d29]">Maintenance Mode</h3>
                                    <p className="text-xs text-[#5f4b3b]">Disable store access for customers temporarily.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="maintenance_mode"
                                        checked={settings.maintenance_mode}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#143d29]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#143d29]"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* ACTIONS */}
                    <div className="flex justify-end pt-6 border-t border-[#eadfcc]">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#143d29] text-white px-8 py-3 rounded-lg font-bold shadow-premium hover:bg-[#0f2e1f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <FiAlertCircle className="animate-spin" /> : <FiSave />}
                            Save Settings
                        </button>
                    </div>
                </div>

                {/* STORE LOCATIONS CONFIGURATION */}
                <AdminStoreSettings />

            </div>
        </motion.div>
    );
};

export default AdminSettingsPage;
