import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import NotAuth from './NotAuth'
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
  return (
    <Router>
            <Routes>
                <Route path="/home" element={<PrivateRoute component={<Home/>} />} />
                <Route path="/notauth" element={<NotAuth />} />
                <Route path="/login" element={<Login />} />
            </Routes>
    </Router>
  );
}

export default AppRouter;
