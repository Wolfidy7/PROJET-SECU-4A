const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const getDirectoryStructure = (dirPath) => {
  const result = {
    name: path.basename(dirPath),
    type: 'folder',
    items: []
  };

  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      result.items.push(getDirectoryStructure(filePath));
    } else {
      result.items.push({
        name: file,
        type: 'file',
        path: filePath  // Ajoutez le chemin du fichier
      });
    }
  });

  return result;
};

app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, '/files'); // Change 'your_directory' to your target directory
  const directoryStructure = getDirectoryStructure(directoryPath);
  res.json(directoryStructure);
});

app.get('/api/file-content', (req, res) => {
  const filePath = req.query.path;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send('Unable to read file: ' + err);
    }
    const fileType = path.extname(filePath).substring(1);
    res.setHeader('Content-Type', `application/${fileType}`);
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
