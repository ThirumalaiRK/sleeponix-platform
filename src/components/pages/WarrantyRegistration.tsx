import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import { ShieldCheck, User, Package, Upload, Calendar, ArrowRight, ArrowLeft, X, Info, Mail, Phone, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// --- Helper Components ---


const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group flex items-center">
    {children}
    <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      {text}
    </div>
  </div>
);


const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center space-x-3 border-b border-gold-champagne/20 pb-3 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(220,200,150,0.1)]">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-gray">{title}</h3>
  </div>
);


// --- Main Component ---


interface WarrantyFormData {
  fullName: string;
  email: string;
  phone: string;
  productType: string;
  model: string;
  purchaseDate: string;
  dealerName: string;
  pincode: string;
  feedback: string;
  invoice: File | null;
}


const productData: Record<string, string[]> = {
  "Natural Latex Mattress": [
    "Hevea Heaven - Premium", "Hevea Heaven - Luxury", "Ortho - Medium Firm",
    "Ortho - Firm", "SpineRelax - Soft", "SpineRelax - Medium", "Custom Size"
  ],
  "Latex Pillow": ["Contour", "Standard", "Shredded"],
  "Mattress Topper": ["2-inch", "3-inch", "4-inch"],
  "Bed Frame": ["Upholstered", "Wooden", "Metal"],
  "Accessories": ["Mattress Protector", "Duvet", "Sheet Set"]
};


const productTypes = Object.keys(productData);
type FormSection = 'customer' | 'product' | 'upload';

const WarrantyRegistration: React.FC = () => {
  const [activeSection, setActiveSection] = useState<FormSection>('customer');
  const [formData, setFormData] = useState<WarrantyFormData>({
    fullName: '',
    email: '',
    phone: '',
    productType: '',
    model: '',
    purchaseDate: '',
    dealerName: '',
    pincode: '',
    feedback: '',
    invoice: null
  });


  const [errors, setErrors] = useState<Partial<Record<keyof WarrantyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shake, setShake] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof WarrantyFormData;


    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));


    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };


  const handleFileChange = (files: FileList | null) => {
    const file = files ? files[0] : null;
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB


      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, invoice: 'Invalid file type. Please use PDF, JPG, or PNG.' }));
        return;
      }
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, invoice: 'File is too large. Maximum size is 5MB.' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, invoice: file }));
      setErrors(prev => ({ ...prev, invoice: undefined }));


      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };


  const handleDrag = function(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files);
    }
  };

  const validateSection = (section: FormSection) => {
    const newErrors: Partial<Record<keyof WarrantyFormData, string>> = {};
    let isValid = true;


    const requiredFieldsMap: Record<FormSection, (keyof WarrantyFormData)[]> = {
      customer: ['fullName', 'email', 'phone'],
      product: ['productType', 'model', 'purchaseDate'],
      upload: ['invoice']
    };

    const fieldsToValidate = requiredFieldsMap[section];

    for (const field of fieldsToValidate) {
      const value = formData[field];
      if (!value) {
        newErrors[field] = 'This field is required.';
        isValid = false;
      }
    }

    if (section === 'customer') {
      if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
        isValid = false;
      }
      if (formData.phone && !/^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
        isValid = false;
      }
    }

    setErrors(prev => ({...prev, ...newErrors}));
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    return isValid;
  };

  const handleNextSection = (nextSection: FormSection) => {
    if (validateSection(activeSection)) {
      setActiveSection(nextSection);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCustomerValid = validateSection('customer');
    const isProductValid = validateSection('product');
    const isUploadValid = validateSection('upload');

    if (!isCustomerValid || !isProductValid || !isUploadValid) {
      toast.error('Please fix the errors before submitting.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      // Navigate to the first invalid section
      if (!isCustomerValid) setActiveSection('customer');
      else if (!isProductValid) setActiveSection('product');
      else if (!isUploadValid) setActiveSection('upload');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2500));
    
    clearInterval(progressInterval);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Warranty registered successfully!');
  };

  const renderInputField = (
    name: Exclude<keyof WarrantyFormData, 'invoice' | 'productType' | 'model' | 'feedback' | 'dealerName' | 'pincode'>,
    label: string,
    placeholder: string,
    type: string = 'text',
    icon: React.ReactNode,
    isRequired: boolean = true,
    tooltip?: string
  ) => (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-gray mb-2 flex items-center">
        {label}
        {tooltip && (
          <Tooltip text={tooltip}>
            <Info size={14} className="inline ml-2 text-gray-400 cursor-help" />
          </Tooltip>
        )}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleInputChange}
          required={isRequired}
          className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm transition-colors ${errors[name] ? 'border-soft-error' : 'border-form-border'} focus:ring-2 focus:ring-mint-glow focus:border-transparent`}
        />
      </div>
      {errors[name] && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-soft-error mt-1">
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10"
    >
      <Confetti recycle={false} numberOfPieces={200} />
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{
            scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 },
            rotate: { ease: 'easeInOut', duration: 0.5, delay: 0.2 }
          }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
        >
          <CheckCircle size={56} className="text-white" />
        </motion.div>
      </div>
      <h2 className="text-3xl font-bold font-serif mt-6 text-slate-gray">Registration Successful!</h2>
      <p className="text-slate-gray/80 mt-2 max-w-md mx-auto">
        Your SleepOnix warranty is now active. A confirmation has been sent to <span className="font-semibold text-slate-gray">{formData.email}</span>.
      </p>
      <Link to="/" className="mt-8 inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md transition-transform hover:scale-105">
        <ArrowLeft size={20} />
        <span>Return Home</span>
      </Link>
    </motion.div>
  );

  return (
    <div className="bg-ivory min-h-screen font-sans">
      <Toaster position="top-center" toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      {/* --- Hero Section --- */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-white text-center py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
            className="p-6 bg-white/10 rounded-full backdrop-blur-md"
          >
            <ShieldCheck size={64} className="text-white drop-shadow-lg" strokeWidth={1.5}/>
          </motion.div>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mt-8 z-10">Warranty Registration</h1>
        <p className="text-lg text-white/80 mt-4 max-w-2xl z-10 font-sans">Secure your purchase and enjoy lasting peace of mind by registering your SleepOnix product.</p>
      </section>

      {/* --- Form Container --- */}
      <main className="relative -mt-24 pb-24">
        <motion.div 
            className={`max-w-3xl mx-auto px-4 ${shake ? 'animate-shake' : ''}`}
        >
          <div className="bg-form-base rounded-3xl shadow-form-card p-8 md:p-12 border border-form-border">
            {isSubmitted ? renderSuccessScreen() : (
              <form onSubmit={handleSubmit} noValidate>
                {/* --- Progress Bar --- */}
                <div className="w-full bg-ivory-dark rounded-full h-2 mb-10">
                  <motion.div
                    className="bg-gradient-to-r from-gold-champagne to-amber-400 h-2 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: activeSection === 'customer' ? '33%' : activeSection === 'product' ? '66%' : '100%' }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {activeSection === 'customer' ? (
                      <section className="space-y-7">
                        <SectionHeader icon={<User size={20} className="text-slate-gray" />} title="Personal Information" />
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                          {renderInputField('fullName', 'Full Name', 'Enter your full name', 'text', <User size={18} />)}
                          {renderInputField('email', 'Email Address', 'your.email@example.com', 'email', <Mail size={18} />)}
                        </div>
                        {renderInputField('phone', 'Phone Number', '+91 98765 43210', 'tel', <Phone size={18} />)}
                        <div className="flex justify-end pt-4">
                          <motion.button type="button" onClick={() => handleNextSection('product')} whileHover={{scale: 1.05}} whileTap={{scale: 0.98}} className="px-8 py-3 rounded-lg bg-gradient-to-r from-gold-champagne to-amber-400 text-white font-semibold shadow-md transition-transform">
                            Next <ArrowRight size={18} className="inline ml-2" />
                          </motion.button>
                        </div>
                      </section>
                    ) : activeSection === 'product' ? (
                      <section className="space-y-7">
                        <SectionHeader icon={<Package size={20} className="text-slate-gray" />} title="Product Information" />
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                          {/* Product Type Select */}
                          <div className="relative">
                            <label className="block text-sm font-medium text-slate-gray mb-2">Product Type</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"><Package size={18} /></span>
                              <select
                                name="productType"
                                value={formData.productType}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-10 py-3 border rounded-xl bg-white shadow-sm appearance-none transition-colors ${errors.productType ? 'border-soft-error' : 'border-form-border'} focus:ring-2 focus:ring-mint-glow focus:border-transparent`}
                              >
                                <option value="" disabled>Select a product</option>
                                {productTypes.map(type => <option key={type} value={type}>{type}</option>)}
                              </select>
                              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            {errors.productType && <p className="text-sm text-soft-error mt-1">{errors.productType}</p>}
                          </div>
                          {/* Model Select */}
                          <div className="relative">
                            <label className="block text-sm font-medium text-slate-gray mb-2">Model</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"><Package size={18} /></span>
                              <select
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                disabled={!formData.productType}
                                className={`w-full pl-12 pr-10 py-3 border rounded-xl bg-white shadow-sm appearance-none transition-colors ${errors.model ? 'border-soft-error' : 'border-form-border'} focus:ring-2 focus:ring-mint-glow focus:border-transparent disabled:bg-gray-100`}
                              >
                                <option value="" disabled>Select a model</option>
                                {formData.productType && productData[formData.productType]?.map(model => <option key={model} value={model}>{model}</option>)}
                              </select>
                              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            {errors.model && <p className="text-sm text-soft-error mt-1">{errors.model}</p>}
                          </div>
                        </div>
                        {renderInputField('purchaseDate', 'Date of Purchase', '', 'date', <Calendar size={18} />, true)}
                        <div className="flex justify-between items-center pt-4">
                          <motion.button type="button" onClick={() => setActiveSection('customer')} whileHover={{scale: 1.05}} whileTap={{scale: 0.98}} className="px-8 py-3 rounded-lg bg-gray-200 text-slate-gray font-semibold transition-transform">
                            <ArrowLeft size={18} className="inline mr-2" /> Back
                          </motion.button>
                          <motion.button type="button" onClick={() => handleNextSection('upload')} whileHover={{scale: 1.05}} whileTap={{scale: 0.98}} className="px-8 py-3 rounded-lg bg-gradient-to-r from-gold-champagne to-amber-400 text-white font-semibold shadow-md transition-transform">
                            Next <ArrowRight size={18} className="inline ml-2" />
                          </motion.button>
                        </div>
                      </section>
                    ) : (
                      <section className="space-y-7">
                        <SectionHeader icon={<Upload size={20} className="text-slate-gray" />} title="Upload & Finalize" />
                        {/* File Upload */}
                        <div>
                          <label className="block text-sm font-medium text-slate-gray mb-2">Upload Invoice (PDF, JPG, PNG)</label>
                          <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${dragActive ? 'border-gold-champagne bg-amber-50' : 'border-form-border'} ${errors.invoice ? 'border-soft-error' : ''}`}
                          >
                            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files)} accept=".pdf,.jpg,.jpeg,.png" />
                            {formData.invoice ? (
                              <div className="text-center">
                                <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
                                <p className="font-semibold text-slate-gray">{formData.invoice.name}</p>
                                <p className="text-sm text-gray-500">{(formData.invoice.size / 1024).toFixed(2)} KB</p>
                                <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(p => ({...p, invoice: null})); setUploadProgress(0); }} className="mt-2 text-soft-error hover:underline text-sm">Remove</button>
                              </div>
                            ) : (
                              <div className="text-center text-gray-500">
                                <Upload size={40} className="mx-auto mb-2" />
                                <p className="font-semibold">Drag & drop or <span className="text-gold-champagne">click to upload</span></p>
                                <p className="text-xs mt-1">Max file size: 5MB</p>
                              </div>
                            )}
                          </div>
                          {errors.invoice && <p className="text-sm text-soft-error mt-1">{errors.invoice}</p>}
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <motion.button type="button" onClick={() => setActiveSection('product')} whileHover={{scale: 1.05}} whileTap={{scale: 0.98}} className="px-8 py-3 rounded-lg bg-gray-200 text-slate-gray font-semibold transition-transform">
                            <ArrowLeft size={18} className="inline mr-2" /> Back
                          </motion.button>
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            {isSubmitting ? 'Submitting...' : 'Register Warranty'}
                          </motion.button>
                        </div>
                      </section>
                    )}
                  </motion.div>
                </AnimatePresence>
              </form>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default WarrantyRegistration;