import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import ChannelPage from './pages/ChannelPage';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/ExplorePage';
import CreatorPanel from './pages/CreatorPanel';
import StreamerPanel from './pages/StreamerPanel';
import BusinessPanel from './pages/BusinessPanel';
import AdsPanel from './pages/AdsPanel';
import AdminPanel from './pages/AdminPanel';
import InvestorDashboard from './pages/InvestorDashboard';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import PremiumPage from './pages/PremiumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch/:videoId" element={<WatchPage />} />
              <Route path="/channel/:channelId" element={<ChannelPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/explore/:category" element={<ExplorePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:productId" element={<ProductPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/creator/*" element={<CreatorPanel />} />
                <Route path="/streamer/*" element={<StreamerPanel />} />
                <Route path="/business/*" element={<BusinessPanel />} />
                <Route path="/ads/*" element={<AdsPanel />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="/investor" element={<InvestorDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
