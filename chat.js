document.addEventListener('DOMContentLoaded', () => {
  // No need to hide the welcome message
  document.getElementById('chat-container').classList.remove('hidden');
  document.getElementById('user-input').classList.remove('hidden');
});

// Handle user input with Enter key
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Handle send button click
document.getElementById('send-button').addEventListener('click', () => {
  sendMessage();
});

// Function to handle sending messages
function sendMessage() {
  const userMessage = document.getElementById('user-input').value.trim();
  if (userMessage) {
    addChatMessage(userMessage, 'user-message');
    getDefinition(userMessage);
    document.getElementById('user-input').value = '';
  }
}

// Function to append chat messages to chat container
function addChatMessage(message, className) {
  const chatContainer = document.getElementById('chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', className);
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}

// Fetch the definition from the backend
function getDefinition(term) {
  fetch(`https://devops-chat-backend-442649655935.us-central1.run.app/api/definition?term=${encodeURIComponent(term)}`, {
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
