import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Hero from './Components/HeroSection/Hero';
import Admin from './Components/Admin/admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';
import Cost from './Components/Cost/cost';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} /> {/* Hero for Home */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} /> {/* Admin Page */}
            <Route path="/cost" element={<Cost />} /> {/* Admin Page */}

          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
