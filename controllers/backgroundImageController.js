const fs = require('fs');
const path = require('path');


exports.backgroundImages = (req, res) => {
  
  const backgroundImagesDir = path.join(__dirname, '..', 'images', 'backgroundimages');
  
  fs.readdir(backgroundImagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read background images folder' });
    }

    // Filter image files (optional)
    const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()));

    // Map files to full URLs
    const imageUrls = imageFiles.map(file => `http://localhost:4000/images/backgroundimages/${file}`);

    res.json(imageUrls);
  });
};