//import logo from './assets/logo.svg';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import UserList from './components/UserList';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import AuthHandler from './AuthHandler';
import NotAuth from './NotAuth';


function App() {
  return (
        // <div>
    //   <div className="d-flex flex-column min-vh-100">
    //     <Header />
    //     <div className="container my-5">
    //       <Home/>
    //     </div>
    //     <Footer />
    //   </div>
    // </div>
    <div>
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthHandler />} />
                <Route path="/home" element={<Home />} />
                <Route path="/notauth" element={<NotAuth />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
