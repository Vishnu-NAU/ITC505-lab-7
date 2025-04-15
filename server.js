document.getElementById('lastModified').textContent = document.lastModified;

// Function to handle the form submission and generate the story
document.getElementById('madLibForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form from reloading the page

  // Get values from form fields
  const creature = document.getElementById('creature').value;
  const object = document.getElementById('object').value;
  const verb = document.getElementById('verb').value;
  const adjective = document.getElementById('adjective').value;
  const place = document.getElementById('place').value;

  // Check if all fields are filled
  if (!creature || !object || !verb || !adjective || !place) {
    alert("Please fill in all fields.");
    return;
  }

  // Generate the Mad Lib story
  const story = `
    <h1>Your Magical Mad Lib Story</h1>
    <p>In the faraway land of <strong>${place}</strong>, a <strong>${adjective}</strong> <strong>${creature}</strong> found a <strong>${object}</strong> and <strong>${verb}</strong> into legend.</p>
    <button onclick="resetForm()">Create Another Story</button>
  `;

  // Display the story
  const storyDiv = document.getElementById('story');
  storyDiv.innerHTML = story;
  storyDiv.style.display = 'block';  // Show the story div
});

// Function to reset the form and hide the story
function resetForm() {
  document.getElementById('madLibForm').reset();
  document.getElementById('story').style.display = 'none';
}
