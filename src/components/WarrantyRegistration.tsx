import React, { useState } from 'react';
import { Shield, Upload, CheckCircle, Calendar, User, Mail, Phone, Package } from 'lucide-react';

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

const WarrantyRegistration: React.FC = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const productTypes = [
    'Natural Latex Mattress',
    'Latex Pillow',
    'Mattress Topper',
    'Bed Frame',
    'Accessories'
  ];

  const mattressModels = [
    'Hevea Heaven - Premium',
    'Hevea Heaven - Luxury',
    'Ortho - Medium Firm',
    'Ortho - Firm',
    'SpineRelax - Soft',
    'SpineRelax - Medium',
    'Custom Size'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or image file (JPG, PNG)');
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      invoice: file
    }));
  };

  const generateReferenceId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `SLX-${timestamp}-${random}`.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'email', 'phone', 'productType', 'model', 'purchaseDate'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof WarrantyFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!formData.invoice) {
      alert('Please upload your purchase invoice');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const refId = generateReferenceId();
      setReferenceId(refId);
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Here you would typically send data to your backend
      console.log('Warranty Registration Data:', {
        ...formData,
        referenceId: refId,
        submittedAt: new Date().toISOString()
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-deep-indigo mb-4">
            Warranty Registered Successfully!
          </h3>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-green-800 mb-2">Your Reference ID:</p>
            <p className="text-2xl font-bold text-green-600 font-mono">{referenceId}</p>
          </div>
          
          <div className="text-left bg-ivory rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-deep-indigo mb-3">What's Next?</h4>
            <ul className="space-y-2 text-slate-gray">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gold-champagne rounded-full mt-2"></div>
                <span>You'll receive a confirmation email within 24 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gold-champagne rounded-full mt-2"></div>
                <span>Keep your reference ID safe for future warranty claims</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gold-champagne rounded-full mt-2"></div>
                <span>Our team will verify your registration within 2-3 business days</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
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
            }}
            className="bg-gold-champagne hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Register Another Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="text-gold-champagne" size={28} />
        <h3 className="text-2xl font-serif font-bold text-deep-indigo">
          Warranty Registration
        </h3>
      </div>
      
      <p className="text-slate-gray mb-8">
        Register your Sleeponix product to activate warranty coverage and receive dedicated support.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              <User size={16} className="inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              <Mail size={16} className="inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              <Phone size={16} className="inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              PIN Code
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              placeholder="600001"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-deep-indigo mb-4">Product Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                <Package size={16} className="inline mr-1" />
                Product Type *
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              >
                <option value="">Select Product Type</option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                Model / SKU *
              </label>
              <select
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              >
                <option value="">Select Model</option>
                {mattressModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                <Calendar size={16} className="inline mr-1" />
                Purchase Date *
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                Dealer Name (Optional)
              </label>
              <input
                type="text"
                name="dealerName"
                value={formData.dealerName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
                placeholder="Store or dealer name"
              />
            </div>
          </div>
        </div>

        {/* Invoice Upload */}
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-medium text-slate-gray mb-2">
            <Upload size={16} className="inline mr-1" />
            Upload Purchase Invoice * (PDF, JPG, PNG - Max 5MB)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gold-champagne transition-colors duration-300">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="invoice-upload"
            />
            <label htmlFor="invoice-upload" className="cursor-pointer">
              <Upload className="text-gray-400 mx-auto mb-2" size={32} />
              {formData.invoice ? (
                <p className="text-green-600 font-medium">{formData.invoice.name}</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-1">Click to upload your invoice</p>
                  <p className="text-sm text-gray-400">PDF, JPG, PNG up to 5MB</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-slate-gray mb-2">
            Feedback (Optional)
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
            placeholder="Share your experience with our product..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold-champagne hover:bg-yellow-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Registering Warranty...</span>
            </>
          ) : (
            <>
              <Shield size={20} />
              <span>Register Warranty</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All information provided will be kept confidential and used only for warranty purposes. 
          You'll receive a confirmation email with your warranty details within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default WarrantyRegistration;