import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Package, ArrowLeft, ArrowRight } from 'lucide-react';

interface WarrantyProductInfoProps {
    formData: {
        productType: string;
        model: string;
        purchaseDate: string;
    };
    errors: Partial<Record<'productType' | 'model' | 'purchaseDate', string>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    productData: Record<string, string[]>;
    productTypes: string[];
    setActiveSection: (section: 'customer' | 'product' | 'upload') => void;
    handleNextSection: (section: 'upload') => void;
}

const WarrantyProductInfo: React.FC<WarrantyProductInfoProps> = ({
    formData,
    errors,
    handleInputChange,
    productData,
    productTypes,
    setActiveSection,
    handleNextSection
}) => {
    return (
        <div className="bg-[#FCFBF7] p-8 rounded-[22px] shadow-lg border border-[#ffffff20] backdrop-blur-lg">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-white/60 p-3 rounded-full shadow-sm">
                    <Package className="w-7 h-7 text-[#98A2B3]" />
                </div>
                <h2 className="text-[26px] font-bold text-[#1D2939]">Product Information</h2>
            </div>

            <div className="space-y-7">
                {/* Product Type Dropdown */}
                <div>
                    <label htmlFor="productType" className="block text-sm font-medium text-[#667085] mb-[22px]">Product Type</label>
                    <div className="relative group">
                        <Package className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none transition-opacity group-hover:opacity-75" />
                        <select
                            id="productType"
                            name="productType"
                            value={formData.productType}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-10 py-[18px] bg-white text-base text-[#1D2939] border border-[#E4E7EC] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F2CB64] focus:scale-[1.01] hover:shadow-md transition-all duration-200"
                            required
                        >
                            <option value="" disabled>Select a product type</option>
                            {productTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none transition-transform group-focus-within:rotate-180" />
                    </div>
                </div>

                {/* Model Dropdown */}
                <div>
                    <label htmlFor="model" className="block text-sm font-medium text-[#667085] mb-[22px]">Model</label>
                    <div className="relative group">
                        <Package className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none transition-opacity group-hover:opacity-75" />
                        <select
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-10 py-[18px] bg-white text-base text-[#1D2939] border border-[#E4E7EC] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F2CB64] focus:scale-[1.01] hover:shadow-md transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            required
                            disabled={!formData.productType}
                        >
                            <option value="" disabled>Select a model</option>
                            {formData.productType && productData[formData.productType]?.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none transition-transform group-focus-within:rotate-180" />
                    </div>
                </div>

                {/* Date of Purchase */}
                <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-[#667085] mb-[22px]">Date of Purchase</label>
                    <div className="relative group">
                        <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none transition-opacity group-hover:opacity-75" />
                        <input
                            type="date"
                            id="purchaseDate"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-[18px] bg-white text-base text-[#1D2939] border border-[#E4E7EC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2CB64] focus:scale-[1.01] hover:shadow-md transition-all duration-200 [color-scheme:light] accent-[#FFB800]"
                            required
                        />
                        {errors.purchaseDate && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-soft-error mt-1">{errors.purchaseDate}</motion.p>}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between">
                <button
                    type="button"
                    onClick={() => setActiveSection('customer')}
                    className="flex items-center space-x-2 px-6 py-3 bg-white text-[#344054] font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
                <button
                    type="button"
                    onClick={() => handleNextSection('upload')}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#F2CB64] text-white font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all transform hover:scale-105"
                >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default WarrantyProductInfo;