import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landing-page/home/HomePage";

import Signup from "./landing-page/signup/Signup";
import Signin from "./landing-page/signin/Signin";
import AboutPage from "./landing-page/about/AboutPage";
import ProductPage from "./landing-page/products/ProductsPage";
import PricingPage from "./landing-page/pricing/PricingPage";
import SupportPage from "./landing-page/support/SupportPage";
import NotFound from "./landing-page/NotFound";

import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-layout d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
