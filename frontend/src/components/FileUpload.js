import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileTypes, setFileTypes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/filetypes')
      .then(response => {
        setFileTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching document types', error);
      });
  }, []);

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
      const response = await axios.post('/api/files/uploads', formData, {
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
    <div>
      <h1>Upload a File</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <div>
          <label htmlFor="fileType">File Type:</label>
          <select id="fileType" value={fileType} onChange={handleFileTypeChange} required>
            <option value="">Select a file type</option>
            {fileTypes.map(fileType => (
              <option key={fileType.id_type} value={fileType.id_type}>{fileType.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
