import React from "react";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Hero from "./Components/HeroSection/Hero";
import Admin from "./Components/Admin/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import Signup from "./Components/signup/Signup";
import Cost from "./Components/Cost/cost";
import TripTracker from "./Components/TripTracker/tripTracker";
import Service from "./Components/Services/services";
import Member from "./Components/Member/member";
import About from "./Components/About/about";
import Safe from "./Components/Safe/safe";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/triptracker" element={<TripTracker />} />
            <Route path="/service" element={<Service />} />
            <Route path="/member" element={<Member />} />
            <Route path="/safe" element={<Safe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
