//import logo from './assets/logo.svg';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import UserList from './components/UserList';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import NotAuth from './NotAuth';
import Login from './Login';


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
                <Route path="/home" element={<Home />} />
                <Route path="/notauth" element={<NotAuth />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
