// Arrow click event listener
document.querySelector('.arrow').addEventListener('click', () => {
  // Hide the initial welcome message
  document.getElementById('welcome-message').classList.add('hidden');

  // Show the chat container and input field after the arrow is clicked
  document.getElementById('chat-container').classList.remove('hidden');
  document.getElementById('user-input').classList.remove('hidden');
});

// User input event to add messages to chat
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const userMessage = e.target.value.trim();
    if (userMessage) {
      addChatMessage(userMessage, 'user-message');
      getDefinition(userMessage);
      e.target.value = '';
    }
  }
});

// Function to append chat messages to chat container
function addChatMessage(message, className) {
  const chatContainer = document.getElementById('chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', className);
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
}

// Fetch the definition from the backend
function getDefinition(term) {
  fetch(`https://devops-chat-backend-442649655935.us-central1.run.app//api/definition?term=${encodeURIComponent(term)}`, {
    mode: 'cors' // Explicitly set CORS mode to handle cross-origin requests
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      const definition = data.definition || 'Term not found.';
      addChatMessage(definition, 'bot-message');
    })
    .catch(error => {
      addChatMessage('Error fetching the definition. Please try again later.', 'bot-message');
      console.error('There was an error with the fetch operation:', error);
    });
}
