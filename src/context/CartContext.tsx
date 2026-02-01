import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../components/products/allProductData';

// Define the shape of a cart item
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the toast message
export interface Toast {
  message: string;
  type: 'success' | 'error';
}

// Define the shape of the cart context (Updated)
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean; // Added
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>; // Added
  toast: Toast | null; // Added
  setToast: React.Dispatch<React.SetStateAction<Toast | null>>; // Added
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component (Updated with new state)
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false); // New state for cart visibility
  const [toast, setToast] = useState<Toast | null>(null); // New state for toast

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const localData = localStorage.getItem('sleeponix_cart');
      if (localData) {
        setCartItems(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Failed to parse cart data from localStorage", error);
      setCartItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sleeponix_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      // Use product.id (from pillows) or the unique product_id (from mattresses)
      const variantId = (product as any).id || (product as any).product_id;

      if (!variantId) {
        console.error("Product added to cart without a unique identifier:", product);
        return prevItems;
      }

      const existingItem = prevItems.find(item => item.id === variantId);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === variantId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      // Add new item to cart, ensuring it has a consistent `id` property.
      const newItem = {
        ...product,
        id: variantId,
        quantity,
      };

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen, // Exposed
    setCartOpen, // Exposed
    toast, // Exposed
    setToast, // Exposed
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};