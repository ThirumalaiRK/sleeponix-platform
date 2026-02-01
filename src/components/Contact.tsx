import React, { useState } from 'react';
import { Mail, Phone, Send, MapPin, Clock } from 'lucide-react';
import StoreLocator from './StoreLocator';
import WarrantyRegistration from './WarrantyRegistration';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Have questions about our mattresses? Our sleep experts are here to help you find the perfect solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-ivory p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-deep-indigo mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-gray mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-gray mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-gray mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent transition-colors duration-300"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gold-champagne hover:bg-yellow-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div className="bg-deep-indigo text-white p-6 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="text-gold-champagne mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">1-800-SLEEPONIX</div>
                    <div className="text-gray-300">(1-800-753-3766)</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-gold-champagne mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@sleeponix.com</div>
                    <div className="text-gray-300">support@sleeponix.com</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold-champagne mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">
                      123 Sleep Avenue<br />
                      Natural City, NC 12345
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="text-gold-champagne mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-gray-300">
                      Mon - Fri: 9AM - 7PM EST<br />
                      Sat - Sun: 10AM - 6PM EST
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Locator Section */}
        <div className="mt-20">
          <StoreLocator />
        </div>

        {/* Warranty Registration Section */}
        <div className="mt-12">
          <WarrantyRegistration />
        </div>
      </div>
    </section>
  );
};

export default Contact;