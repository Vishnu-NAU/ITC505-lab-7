const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Serve static files from 'public' folder
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Global variable to store form data and generated story
let formData = {}
let generatedStory = ''

// Debug route (optional)
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// POST handler for the Mad Lib form submission
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { creature, object, verb, adjective, place } = req.body

  // Store form data in the global variable
  formData = { creature, object, verb, adjective, place }

  // Check if any field is missing and store an error message if so
  if (!creature || !object || !verb || !adjective || !place) {
    generatedStory = `
      <h1>Form Incomplete</h1>
      <p>Please fill in all fields before submitting.</p>
      <a href="/ITC505/lab-7/index.html">Back to Form</a>
    `
  } else {
    // Generate the story using the stored form data
    generatedStory = `
      <body style="background-color: #f0f8ff; font-family: Arial; padding: 20px;">
        <h1>Your Magical Mad Lib Story</h1>
        <p>In the faraway land of <strong>${place}</strong>, a <strong>${adjective}</strong> <strong>${creature}</strong> found a <strong>${object}</strong> and <strong>${verb}</strong> into legend.</p>
        <a href="/ITC505/lab-7/index.html">Create Another Story</a>
      </body>
    `
  }

  // Redirect to view the story
  res.redirect('/view-story')
})

// Route to view the generated Mad Lib story (using the stored form data)
server.get('/view-story', (req, res) => {
  // Send the generated story from the global variable
  res.send(generatedStory)
})

// Port setup based on command line argument
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

// Start the server
server.listen(port, () => {
  console.log(` Server running at http://localhost:${port}/`)
})
