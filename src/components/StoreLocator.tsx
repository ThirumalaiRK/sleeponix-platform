import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Clock, Star } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  pincode: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  rating: number;
  hours: string;
  products: string[];
}

const StoreLocator: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Sample store data for Tamil Nadu
  const storeDatabase: Store[] = [
    {
      id: '1',
      name: 'Srinivasa Home Comfort',
      pincode: '600091',
      address: 'No. 12, Velachery Main Road, Chennai',
      phone: '94444 12345',
      lat: 12.9785,
      lng: 80.2217,
      rating: 4.8,
      hours: '9:00 AM - 8:00 PM',
      products: ['Mattress', 'Pillows', 'Toppers']
    },
    {
      id: '2',
      name: 'Dream Sleep Center',
      pincode: '600001',
      address: '45, Anna Salai, Mount Road, Chennai',
      phone: '94444 67890',
      lat: 13.0827,
      lng: 80.2707,
      rating: 4.6,
      hours: '10:00 AM - 9:00 PM',
      products: ['Mattress', 'Pillows']
    },
    {
      id: '3',
      name: 'Natural Sleep Solutions',
      pincode: '641001',
      address: '23, Race Course Road, Coimbatore',
      phone: '94444 11111',
      lat: 11.0168,
      lng: 76.9558,
      rating: 4.9,
      hours: '9:30 AM - 8:30 PM',
      products: ['Mattress', 'Toppers']
    },
    {
      id: '4',
      name: 'Comfort Zone Mattress',
      pincode: '620001',
      address: '67, Trichy Road, Thanjavur',
      phone: '94444 22222',
      lat: 10.7905,
      lng: 79.1378,
      rating: 4.7,
      hours: '9:00 AM - 7:30 PM',
      products: ['Mattress', 'Pillows', 'Toppers']
    },
    {
      id: '5',
      name: 'Elite Sleep Store',
      pincode: '625001',
      address: '89, West Veli Street, Madurai',
      phone: '94444 33333',
      lat: 9.9252,
      lng: 78.1198,
      rating: 4.5,
      hours: '10:00 AM - 8:00 PM',
      products: ['Mattress', 'Pillows']
    }
  ];

  const searchStores = async () => {
    if (!pincode || pincode.length !== 6) {
      alert('Please enter a valid 6-digit PIN code');
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Find exact match first, then nearby pincodes
      const exactMatch = storeDatabase.filter(store => store.pincode === pincode);
      const nearbyStores = storeDatabase.filter(store => {
        const storePincode = parseInt(store.pincode);
        const searchPincode = parseInt(pincode);
        const difference = Math.abs(storePincode - searchPincode);
        return difference <= 10000 && store.pincode !== pincode; // Within range
      });

      const results = [...exactMatch, ...nearbyStores].slice(0, 5);
      setStores(results);
      setLoading(false);
      
      if (results.length === 0) {
        alert('No stores found in your area. Please contact us for assistance.');
      }
    }, 1000);
  };

  const getDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}&destination_place_id=${store.name}`;
    window.open(url, '_blank');
  };

  const callStore = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="text-gold-champagne" size={28} />
        <h3 className="text-2xl font-serif font-bold text-deep-indigo">
          Find Nearby Stores
        </h3>
      </div>
      
      <p className="text-slate-gray mb-6">
        Enter your PIN code to find authorized Sleeponix dealers near you
      </p>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter 6-digit PIN code"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
          maxLength={6}
        />
        <button
          onClick={searchStores}
          disabled={loading}
          className="bg-gold-champagne hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <MapPin size={20} />
              <span>Find Stores</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {stores.length > 0 && (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-deep-indigo">
            {stores.length} Store{stores.length > 1 ? 's' : ''} Found Near You
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((store) => (
              <div 
                key={store.id}
                className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                  selectedStore?.id === store.id 
                    ? 'border-gold-champagne bg-gold-champagne/5' 
                    : 'border-gray-200 hover:border-gold-champagne/50'
                }`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h5 className="text-lg font-semibold text-deep-indigo">
                    {store.name}
                  </h5>
                  <div className="flex items-center space-x-1">
                    <Star className="text-gold-champagne fill-current" size={16} />
                    <span className="text-sm font-medium">{store.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="text-slate-gray mt-1" size={16} />
                    <span className="text-slate-gray text-sm">{store.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="text-slate-gray" size={16} />
                    <span className="text-slate-gray text-sm">{store.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="text-slate-gray" size={16} />
                    <span className="text-slate-gray text-sm">{store.hours}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {store.products.map((product) => (
                      <span 
                        key={product}
                        className="px-2 py-1 bg-forest-green/10 text-forest-green text-xs rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      callStore(store.phone);
                    }}
                    className="flex-1 bg-deep-indigo hover:bg-deep-indigo/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center space-x-1"
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      getDirections(store);
                    }}
                    className="flex-1 border border-gold-champagne text-gold-champagne hover:bg-gold-champagne hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Navigation size={14} />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <MapPin className="text-gray-400 mx-auto mb-4" size={48} />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h4>
            <p className="text-gray-500 mb-4">
              Map integration with Google Maps API will show store locations with markers
            </p>
            <button className="bg-gold-champagne text-white px-6 py-2 rounded-lg font-medium">
              View on Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreLocator;