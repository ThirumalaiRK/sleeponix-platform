import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// Fix: Removed explicit .tsx extension from local imports to resolve "Could not resolve" errors
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import OurStoryPage from './components/pages/OurStoryPage';
import ShopPage from './components/pages/ShopPage';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import WhyLatexPage from './components/pages/WhyLatexPage';
import HeveaHeaven from './components/products/HeveaHeaven';
import SpineRelax from './components/products/SpineRelax';
import Bliss from './components/products/bliss';
import Ortho from './components/products/Ortho';
import Cocoon from './components/products/Cocoon';
import PillowsPage from './components/pages/PillowsPage';
import PillowProductPage from './components/products/PillowProductPage';
import AccessoriesPage from './components/pages/AccessoriesPage';
import AccessoryProductPage from './components/products/AccessoryProductPage';
import StoreFinder from './components/pages/StoreFinder';
import WarrantyRegistration from './components/pages/WarrantyRegistration';
import MeasureBedSize from './components/pages/MeasureBedSize';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import ProductDetailPage from './components/pages/ProductDetailPage';
import OrderConfirmationPage from './components/pages/OrderConfirmationPage';

// Admin Imports
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminOrdersPage from './admin/pages/AdminOrdersPage';
import AdminEmailCenter from './admin/pages/AdminEmailCenter';
import IncomeAnalysisPage from './admin/pages/IncomeAnalysisPage';
import AdminAnalyticsPage from './admin/pages/AdminAnalyticsPage';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// ------------------ App Root ------------------
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.hasChildNodes()) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Router>
        <CartProvider>
          <ScrollToTop />
          <Toaster position="bottom-center" />
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/our-story" element={<Layout><OurStoryPage /></Layout>} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            {/* MERGE: Removed <Layout> wrapper for CheckoutPage for a cleaner, full-width checkout experience */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<Layout><OrderConfirmationPage shippingDetails={{
              fullName: "John Doe",
              email: "johndoe@example.com",
              phone: "1234567890",
              address1: "123 Main St",
              city: "Anytown",
              state: "CA",
              postalCode: "123456"
            }} cartItems={[]} /></Layout>} />
            <Route path="/why-latex" element={<Layout><WhyLatexPage /></Layout>} />
            <Route path="/products/hevea-heaven" element={<Layout><HeveaHeaven /></Layout>} />
            <Route path="/products/bliss" element={<Layout><Bliss /></Layout>} />
            <Route path="/products/ortho" element={<Layout><Ortho /></Layout>} />
            <Route path="/products/cocoon" element={<Layout><Cocoon /></Layout>} />
            <Route path="/products/pillows" element={<Layout><PillowsPage /></Layout>} />
            <Route path="/products/accessories" element={<Layout><AccessoriesPage /></Layout>} />
            <Route path="/products/SpineRelax" element={<Layout><SpineRelax /></Layout>} />
            <Route path="/products/pillows/:pillowId" element={<Layout><PillowProductPage /></Layout>} />
            <Route path="/products/accessories/:accessoryId" element={<Layout><AccessoryProductPage /></Layout>} />
            <Route path="/products/:productId" element={<Layout><ProductDetailPage /></Layout>} />
            <Route path="/store-finder" element={<Layout><StoreFinder /></Layout>} />
            <Route path="/warranty" element={<Layout><WarrantyRegistration /></Layout>} />
            <Route path="/measure-bed-size" element={<Layout><MeasureBedSize /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin/login" element={<Navigate to="/admin-login" replace />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="notifications" element={<AdminEmailCenter />} />
                <Route path="income" element={<IncomeAnalysisPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Layout><HomePage /></Layout>} />
          </Routes>
        </CartProvider>
      </Router>
    </StrictMode>
  );
}