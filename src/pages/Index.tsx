import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Landing page components
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ClientLogos from '../components/ClientLogos';
import HowWeWork from '../components/HowWeWork';
import WhoWeAre from '../components/WhoWeAre';
import TestimonialCarousel from '../components/TestimonialCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import OurWorks from '../components/OurWorks';
import WhatWeDesign from '../components/WhatWeDesign';
import PricingSection from '../components/Pricing';
import FAQSection from '../components/FAQ';
import Footer from '../components/Footer';

// Checkout pages
import CreateAccount from '../pages/CreateAccount';  // Halaman Create Account
import Checkout from '../pages/Checkout';            // Halaman Checkout
import CompanyInformation from '../pages/CompanyInformation'; // Halaman Company Information
import Success from '../pages/Success';              // Halaman Success

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ClientLogos />
      <HowWeWork />
      <WhoWeAre />
      <TestimonialCarousel />
      <OurWorks />
      <WhatWeDesign />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/company-information" element={<CompanyInformation />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
