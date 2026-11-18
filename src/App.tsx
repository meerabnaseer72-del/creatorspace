import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Home } from './pages/Home';
import { ExploreCreators } from './pages/ExploreCreators';
import { CreatorProfile } from './pages/CreatorProfile';
import { ExploreServices } from './pages/ExploreServices';
import { ServiceDetails } from './pages/ServiceDetails';
import { Wishlist } from './pages/Wishlist';
import { Inquiry } from './pages/Inquiry';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <WishlistProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/creators" element={<ExploreCreators />} />
                <Route path="/creators/:id" element={<CreatorProfile />} />
                <Route path="/services" element={<ExploreServices />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </WishlistProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
