import {useEffect} from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutWorkPage from './pages/AboutWorkPage';
import ContactPage from './pages/ContactPage';

function ScrollToTopOnRoute() {
  const {pathname, hash} = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <div className="min-h-screen flex flex-col bg-[#FFF8ED] text-[#30414B]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutWorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
