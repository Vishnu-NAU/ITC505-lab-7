const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Random number test route
app.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST handler for your actual form inputs
app.post('/ITC505/lab-7/index.html', (req, res) => {
  const { creature, object, verb, adjective, place } = req.body;

  if (!creature || !object || !verb || !adjective || !place) {
    return res.send(`
      <h1>Form Incomplete</h1>
      <p>Please fill in all fields before submitting.</p>
      <a href="/ITC505/lab-7/index.html">Back to Form</a>
    `);
  }

  const story = `
    <body style="background-color: #f0f8ff; font-family: Arial; padding: 20px;">
      <h1>Your Magical Mad Lib Story</h1>
      <p>In the faraway land of <strong>${place}</strong>, a <strong>${adjective}</strong> <strong>${creature}</strong> found a <strong>${object}</strong> and <strong>${verb}</strong> into legend.</p>
      <a href="/ITC505/lab-7/index.html">Create Another Story</a>
    </body>
  `;

  res.send(story);
});

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
