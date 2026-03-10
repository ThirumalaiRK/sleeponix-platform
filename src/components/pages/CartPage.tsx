import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const getProductSubtitle = (productId: string): string => {
    const subtitles: { [key: string]: string } = {
      'hevea-heaven': '100% Natural Latex Mattress',
      'spinerelax': 'Dual-Layer Spine Support',
      'ortho': 'Triple-Layer Joint Comfort',
      'premium-pillow': 'Natural Comfort Support'
    };
    // Extract base product ID if it's a composite ID
    const baseId = productId.split('-')[0] + '-' + productId.split('-')[1];
    return subtitles[productId] || subtitles[baseId] || 'Premium Sleep Product';
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscount(0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartTotal;
  const discountAmount = subtotal * discount;
  const shipping = 0;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-6 text-slate-gray" size={80} />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-indigo mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-gray mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="bg-gold-champagne hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28">

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/shop"
          className="inline-flex items-center text-[#1C2635] hover:text-[#C2A66D] transition-colors duration-300 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif font-bold text-deep-indigo mb-8">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-deep-indigo">
                          {item.name}
                        </h3>
                        <p className="text-gold-champagne font-medium">
                          {(item as any).subtitle || item.tagline || getProductSubtitle(item.id)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-gray">
                      {(item as any).size && <span>Size: {(item as any).size}</span>}
                      {(item as any).color && <span>Color: {(item as any).color}</span>}
                      {(item as any).thickness && <span>Thickness: {(item as any).thickness}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold-champagne transition-colors duration-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-deep-indigo w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold-champagne transition-colors duration-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-deep-indigo">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-gray">
                          ₹{item.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <h3 className="text-xl font-serif font-bold text-deep-indigo mb-6">
                Order Summary
              </h3>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-gray mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-deep-indigo hover:bg-deep-indigo/90 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {discount * 100}% discount applied!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-gray">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount * 100}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-gray">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-deep-indigo">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-gold-champagne hover:bg-yellow-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </Link>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-gray">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;