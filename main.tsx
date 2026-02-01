import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './src/components/Layout';
import HomePage from './src/components/pages/HomePage';
import OurStoryPage from './src/components/pages/OurStoryPage';
import ShopPage from './src/components/pages/ShopPage';
import CartPage from './src/components/pages/CartPage';
import CheckoutPage from './src/components/pages/CheckoutPage';
import WhyLatexPage from './src/components/pages/WhyLatexPage';
import HeveaHeaven from './src/components/products/HeveaHeaven';
import SpineRelax from './src/components/products/SpineRelax';
import Bliss from './src/components/products/bliss';
import Ortho from './src/components/products/Ortho';
import Cocoon from './src/components/products/Cocoon';
import PillowsPage from './src/components/pages/PillowsPage';
import PillowProductPage from './src/components/products/PillowProductPage';
import AccessoriesPage from './src/components/pages/AccessoriesPage';
import AccessoryProductPage from './src/components/products/AccessoryProductPage';
import StoreFinder from './src/components/pages/StoreFinder';
import WarrantyRegistration from './src/components/pages/WarrantyRegistration';
import MeasureBedSize from './src/components/pages/MeasureBedSize';
import './src/index.css';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './src/context/CartContext';
import ProductDetailPage from './src/components/pages/ProductDetailPage';
import OrderConfirmationPage from './src/components/pages/OrderConfirmationPage';
import AdminLayout from './src/admin/components/AdminLayout';
import AdminDashboardPage from './src/admin/pages/AdminDashboardPage';
import IncomeAnalysisPage from './src/admin/pages/IncomeAnalysisPage';
import AdminOrdersPage from './src/admin/pages/AdminOrdersPage';
import AdminEmailCenter from './src/admin/pages/AdminEmailCenter';
import AdminLoginPage from './src/admin/pages/AdminLoginPage';

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
            <Route path="/admin-login" element={<AdminLoginPage />} />
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="notifications" element={<AdminEmailCenter />} />
              <Route path="income" element={<IncomeAnalysisPage />} />
            </Route>

            <Route path="*" element={<Layout><HomePage /></Layout>} />
          </Routes>
        </CartProvider>
      </Router>
    </StrictMode>
  );
}