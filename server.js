const express = require('express');
const path = require('path');
const app = express();
const folder = path.join(__dirname, 'dist/maja-test-frontend/browser');

app.use(express.static(folder));
app.get('*', (req, res) => {
  res.sendFile(path.join(folder, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});