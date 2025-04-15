const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from 'public' folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Global variable to store the Mad Lib story
let generatedStory = "";

// POST handler to store form data in a variable
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { creature, object, verb, adjective, place } = req.body;

    // Check if any of the fields are empty
    if (!creature || !object || !verb || !adjective || !place) {
        generatedStory = `
            <h1>Form Incomplete</h1>
            <p>Please fill in all fields before submitting.</p>
            <a href="/ITC505/lab-7/index.html">Back to Form</a>
        `;
    } else {
        // Construct the story and store it in the variable
        generatedStory = `
            <body style="background-color: #f0f8ff; font-family: Arial; padding: 20px;">
                <h1>Your Magical Mad Lib Story</h1>
                <p>In the faraway land of <strong>${place}</strong>, a <strong>${adjective}</strong> <strong>${creature}</strong> found a <strong>${object}</strong> and <strong>${verb}</strong> into legend.</p>
                <a href="/ITC505/lab-7/index.html">Create Another Story</a>
            </body>
        `;
    }
    
    // Store it in a session or in-memory variable (not used directly for response)
    // This is done so you can refer to it later without needing to send a response immediately
});

// Route to view the generated Mad Lib story
server.get('/view-story', (req, res) => {
    // Access the stored story or error message
    res.send(generatedStory);
});

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}

// Start the server
server.listen(port, () => {
    console.log(` Server running at http://localhost:${port}/`);
});
