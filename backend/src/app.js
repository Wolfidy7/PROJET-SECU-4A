import React, { useState, useEffect } from 'react';
import axios from 'axios';
import keycloak from './keycloak';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (!authenticated) {
        keycloak.login();
      }
    });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${keycloak.token}`
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="App">
      <h1>Upload a File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
