// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home'); // State to manage the current page

  useEffect(() => {
    // Check if user is authenticated
    axios.get('/api/users/isAuthenticated')
      .then(response => {
        setAuthenticated(response.data.authenticated);
        if (response.data.authenticated) {
          // Check if user is admin
          return axios.get('/api/users/isAdmin');
        }
      })
      .then(response => {
        if (response) {
          setIsAdmin(response.data.isAdmin);
        }
      })
      .catch(error => {
        console.error('Error checking authentication or admin status', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // to change --- this is just a test ---
  if (!authenticated) {
    // return <Login />;
    return <FileUpload />;
  }

  let content;
  if (page === 'upload') {
    content = <FileUpload />;
  } else {
    content = <Home />;
  }

  return (
    <div>
      <nav>
        <button onClick={() => handlePageChange('home')}>Home</button>
        {isAdmin && <button onClick={() => handlePageChange('upload')}>Upload</button>}
      </nav>
      {content}
    </div>
  );
}

export default App;
