import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

function FileUpload({ kc, redirectUri }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileTypes, setFileTypes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/filetypes')
      .then(response => {
        setFileTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching document types', error);
      });
  }, []);

  const goToUpload = () => {
    window.location.href = 'http://localhost:3000/upload';
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !fileType) {
      setMessage('Please select a file and choose a file type');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('id_type', fileType);

    try {
      const response = await axios.post('http://localhost:3001/api/files/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file FileUpload : ', error);
      setMessage('Error uploading file FileUpload');
    }
  };

  return (
    <>
      <Header kc={kc} redirectUri={redirectUri} />
  
      <div className="container d-flex flex-column min-vh-80 my-5">
        <div className="flex-grow-1">
          <h1 className="display-4">Télécharger un fichier</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Sélectionner un fichier :</label>
              <input type="file" className="form-control" id="file" onChange={handleFileChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="fileType" className="form-label">Type de fichier :</label>
              <select className="form-select" id="fileType" value={fileType} onChange={handleFileTypeChange} required>
                <option value="">Sélectionner un type de fichier</option>
                {fileTypes.map(fileType => (
                  <option key={fileType.id_type} value={fileType.id_type}>{fileType.nom}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-danger" type="submit">Télécharger</button>
          </form>
          
          {message && <p>{message}</p>}
        </div>
  
        <div className="d-flex justify-content-end">
          <a href="http://localhost:3000">
            <button className="btn btn-primary">Accueil</button>
          </a>
        </div>
      </div>
    </>
  );
    
}

export default FileUpload;
