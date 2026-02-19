import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

// route-level code splitting — lazy-load pages so initial bundle is smaller
const Home = React.lazy(() => import('./pages/Home'));
const PropertyDetails = React.lazy(() => import('./pages/PropertyDetails'));
const Legal = React.lazy(() => import('./pages/Legal'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const PropertiesPage = React.lazy(() => import('./pages/PropertiesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const InsightsPage = React.lazy(() => import('./pages/InsightsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-[60vh] grid place-items-center">Loading…</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/privacy" element={<Legal title="Privacy Policy" type="privacy" />} />
          <Route path="/terms" element={<Legal title="Terms of Service" type="terms" />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen text-platinum selection:bg-gold/30 selection:text-white">
      <HashRouter>
        {/* Non-touch devices get custom cursor */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <Navbar />

        <main>
          <AnimatedRoutes />
        </main>

        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;