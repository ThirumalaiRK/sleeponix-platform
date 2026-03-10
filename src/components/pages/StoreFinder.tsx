import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, Clock, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { useSEO } from '../../hooks/useSEO';

interface Store {
  id: string;
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

const StoreFinder: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useSEO({
    title: 'Find a Sleeponix Store Near You | Store Locator',
    description: 'Locate your nearest Sleeponix showroom. Enter your PIN code to find authorised Sleeponix dealers and experience our natural latex mattresses in person.',
    keywords: 'Sleeponix store near me, latex mattress showroom, mattress store locator India',
    canonicalPath: '/store-finder',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const searchStores = async () => {
    if (!pincode || pincode.length !== 6) {
      alert('Please enter a valid 6-digit PIN code');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('store_locations')
        .select('*');

      if (error) {
        console.error(error);
        alert('Failed to fetch stores');
        setLoading(false);
        return;
      }

      const storeData = data as Store[];

      const exactMatch = storeData.filter(store => store.pincode === pincode);
      const nearbyStores = storeData.filter(store => {
        const storePincode = parseInt(store.pincode);
        const searchPincode = parseInt(pincode);
        const difference = Math.abs(storePincode - searchPincode);
        return difference <= 100 && store.pincode !== pincode;
      });

      const results = [...exactMatch, ...nearbyStores].slice(0, 5);
      setStores(results);

      if (results.length === 0) {
        alert('No stores found in your area. Please contact us for assistance.');
      }

    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (store: Store) => {
    if (store.google_maps_url) {
      window.open(store.google_maps_url, '_blank');
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}&destination_place_id=${store.name}`;
      window.open(url, '_blank');
    }
  };

  const callStore = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  /** ⭐ Variants merged from second code snippet */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-soft-cream">

      {/* Hero Section */}
      <motion.section
        className="relative w-full min-h-[50vh] flex flex-col justify-center items-center text-center text-white px-6"
        style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #173F33 100%)' }}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <MapPin size={32} className="text-white" />
          </div>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-semibold leading-tight">
          Find a Sleeponix Store
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#E6F0EC] max-w-2xl mx-auto mt-4">
          Experience our collection in person. Locate your nearest showroom.
        </motion.p>
      </motion.section>

      {/* Store Finder */}
      <section className="py-16 sm:py-20 -mt-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Input Box */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">

              <div className="relative flex-grow w-full">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit PIN code"
                  className="w-full h-14 pl-12 pr-4 bg-[#F7F7F5] border border-[#E0E3DF] rounded-full focus:ring-4 focus:ring-[#C6A878]/20 focus:border-[#C6A878] transition-all duration-300 text-[#173F33] placeholder-[#9DA9A2]"
                  maxLength={6}
                />
              </div>

              <button
                onClick={searchStores}
                disabled={loading}
                className="w-full sm:w-auto bg-[#C6A878] hover:bg-[#B49563] active:bg-[#9E7C4F] text-white px-8 h-14 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <span>Find Stores</span>
                )}
              </button>

            </div>
          </motion.div>

          {/* Store Results */}
          {stores.length > 0 && (
            <motion.div
              className="mt-12 space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >

              <h4 className="text-2xl font-semibold text-[#1B4D3E]">
                {stores.length} Store{stores.length > 1 ? 's' : ''} Found Near You
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stores.map((store) => (
                  <motion.div
                    key={store.id}
                    variants={itemVariants}
                    className={`bg-white rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer ring-2 ${selectedStore?.id === store.id
                      ? 'ring-[#C6A878]'
                      : 'ring-transparent'
                      }`}
                    onClick={() => setSelectedStore(store)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="text-lg font-semibold text-[#173F33]">
                        {store.name}
                      </h5>
                      <div className="flex items-center space-x-1 text-[#C6A878]">
                        <Star fill="currentColor" size={16} />
                        <span className="text-sm font-medium">{store.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start space-x-3">
                        <MapPin className="mt-1" size={16} />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone size={16} />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock size={16} />
                        <span>{store.hours}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={(e) => { e.stopPropagation(); callStore(store.phone); }}
                        className="flex-1 bg-[#1B4D3E] hover:bg-[#173F33] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Phone size={14} />
                        <span>Call</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); getDirections(store); }}
                        className="flex-1 border border-[#C6A878] text-[#C6A878] hover:bg-[#C6A878] hover:text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Navigation size={14} />
                        <span>Directions</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
};

export default StoreFinder;
