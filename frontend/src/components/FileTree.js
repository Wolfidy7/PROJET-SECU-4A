import React, { useEffect, useState } from 'react';
import axios from 'axios';

const File = ({ name, path, onClick }) => (
  <div onClick={() => onClick(path)} style={{ cursor: 'pointer' }}>
    📄 {name}
  </div>
);

const Folder = ({ name, items, level = 0, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        📁 {name}
      </div>
      {isOpen && (
        <div>
          {items.map((item, index) =>
            item.type === 'folder' ? (
              <Folder key={index} {...item} level={level + 1} onClick={onClick} />
            ) : (
              <File key={index} {...item} onClick={onClick} />
            )
          )}
        </div>
      )}
    </div>
  );
};

const FileTree = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/files')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the files!", error);
      });
  }, []);

  const handleFileClick = (filePath) => {
    axios.get(`http://localhost:3001/api/file-content?path=${encodeURIComponent(filePath)}`, {
      responseType: 'blob'  // Important pour les fichiers binaires (PDF)
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';  // Ouvre dans un nouvel onglet
        link.click();
        // Optionally, you can revoke the object URL after some time
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      })
      .catch(error => {
        console.error("There was an error fetching the file content!", error);
      });
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Folder {...data} onClick={handleFileClick} />
    </div>
  );
};

export default FileTree;
