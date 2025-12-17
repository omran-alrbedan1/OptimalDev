const fs = require('fs');
const path = require('path');

const foldersToDelete = [
  '.next',
  '.turbo',
  'node_modules/.cache'
];

const filesToDelete = [
  '.eslintcache'
];

console.log('Cleaning cache...');

// Delete folders
foldersToDelete.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Deleted: ${folder}`);
  }
});

// Delete files
filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${file}`);
  }
});

console.log('Cache cleared successfully!');