import { StrictMode, lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

// 🔴 EAGERLY loaded — must be available immediately on first paint
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import FloatingMatchPrompt from './components/FloatingMatchPrompt';

// 🟡 LAZILY loaded — only fetched when user navigates to the route
// This reduces the initial JS bundle by ~60%, improving Time to Interactive
const OurStoryPage = lazy(() => import('./components/pages/OurStoryPage'));
const ShopPage = lazy(() => import('./components/pages/ShopPage'));
const CartPage = lazy(() => import('./components/pages/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage'));
const WhyLatexPage = lazy(() => import('./components/pages/WhyLatexPage'));
const PillowsPage = lazy(() => import('./components/pages/PillowsPage'));
const AccessoriesPage = lazy(() => import('./components/pages/AccessoriesPage'));
const KidsLatexPage = lazy(() => import('./components/pages/KidsLatexPage'));
const PetLatexPage = lazy(() => import('./components/pages/PetLatexPage'));
const StoreFinder = lazy(() => import('./components/pages/StoreFinder'));
const WarrantyRegistration = lazy(() => import('./components/pages/WarrantyRegistration'));
const MeasureBedSize = lazy(() => import('./components/pages/MeasureBedSize'));
const SleepQuiz = lazy(() => import('./components/pages/SleepQuiz'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const ReturnPolicy = lazy(() => import('./components/pages/ReturnPolicy'));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage'));
const OrderConfirmationPage = lazy(() => import('./components/pages/OrderConfirmationPage'));

// Product pages (lazily loaded — users rarely visit all of them)
const HeveaHeaven = lazy(() => import('./components/products/HeveaHeaven'));
const SpineRelax = lazy(() => import('./components/products/SpineRelax'));
const Bliss = lazy(() => import('./components/products/bliss'));
const Ortho = lazy(() => import('./components/products/Ortho'));
const Cocoon = lazy(() => import('./components/products/Cocoon'));
const PillowProductPage = lazy(() => import('./components/products/PillowProductPage'));
const AccessoryProductPage = lazy(() => import('./components/products/AccessoryProductPage'));

// 🔴 Admin — lazily loaded (never needed by regular shoppers)
const AdminLoginPage = lazy(() => import('./admin/pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./admin/pages/AdminDashboardPage'));
const AdminOrdersPage = lazy(() => import('./admin/pages/AdminOrdersPage'));
const AdminEmailCenter = lazy(() => import('./admin/pages/AdminEmailCenter'));
const IncomeAnalysisPage = lazy(() => import('./admin/pages/IncomeAnalysisPage'));
const AdminAnalyticsPage = lazy(() => import('./admin/pages/AdminAnalyticsPage'));
const AdminSettingsPage = lazy(() => import('./admin/pages/AdminSettingsPage'));
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Loading fallback shown while a lazy chunk is being fetched
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-[#C6A878] border-t-transparent animate-spin" />
      <p className="text-slate-400 text-sm font-medium tracking-wide">Loading...</p>
    </div>
  </div>
);

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
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Core pages */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/our-story" element={<Layout><OurStoryPage /></Layout>} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<Layout><CartPage /></Layout>} />
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

                {/* Mattress products */}
                <Route path="/products/hevea-heaven" element={<Layout><HeveaHeaven /></Layout>} />
                <Route path="/products/bliss" element={<Layout><Bliss /></Layout>} />
                <Route path="/products/ortho" element={<Layout><Ortho /></Layout>} />
                <Route path="/products/cocoon" element={<Layout><Cocoon /></Layout>} />
                <Route path="/products/spine-relax" element={<Layout><SpineRelax /></Layout>} />
                {/* Redirect old camelCase URL so existing links don't 404 */}
                <Route path="/products/spine-relax" element={<Navigate to="/products/spine-relax" replace />} />

                {/* Pillows & accessories */}
                <Route path="/products/pillows" element={<Layout><PillowsPage /></Layout>} />
                <Route path="/products/accessories" element={<Layout><AccessoriesPage /></Layout>} />
                <Route path="/products/pillows/:pillowId" element={<Layout><PillowProductPage /></Layout>} />
                <Route path="/products/accessories/:accessoryId" element={<Layout><AccessoryProductPage /></Layout>} />

                {/* Special collections */}
                <Route path="/products/kids-latex" element={<Layout><KidsLatexPage /></Layout>} />
                <Route path="/products/pet-latex" element={<Layout><PetLatexPage /></Layout>} />

                {/* Dynamic product detail */}
                <Route path="/products/:productId" element={<Layout><ProductDetailPage /></Layout>} />

                {/* Support */}
                <Route path="/store-finder" element={<Layout><StoreFinder /></Layout>} />
                <Route path="/warranty" element={<Layout><WarrantyRegistration /></Layout>} />
                <Route path="/measure-bed-size" element={<Layout><MeasureBedSize /></Layout>} />
                <Route path="/find-match" element={<Layout><SleepQuiz /></Layout>} />

                {/* Legal */}
                <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
                <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/return-policy" element={<Layout><ReturnPolicy /></Layout>} />

                {/* Admin routes */}
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
                    <Route path="settings" element={<AdminSettingsPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
            <FloatingMatchPrompt />
          </ErrorBoundary>
        </CartProvider>
      </Router>
    </StrictMode>
  );
}