import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const Womens = lazy(() => import('./pages/Womens'));
const Mens = lazy(() => import('./pages/Mens'));
const Brands = lazy(() => import('./pages/Brands'));
const AdminSignIn = lazy(() => import('./pages/AdminSignIn'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));


// Main App Component
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/women" element={<Womens />} />
          <Route path="/men" element={<Mens />} />
          <Route path="/brands" element={<Brands />} />

          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </>
  );
}

// Wrap everything in Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


 
