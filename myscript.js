function showLoadingSpinner() {
  var spinner = document.createElement("div");
  spinner.className = "spinner";
  document.body.appendChild(spinner);
  return spinner;
}

function hideLoadingSpinner(spinner) {
  document.body.removeChild(spinner);
}

function loadContentWithSpinner(contentId, delay) {
  var content = document.getElementById(contentId);
  var spinner = showLoadingSpinner();
  content.style.display = "none";

  setTimeout(function() {
    content.style.display = "block";
    hideLoadingSpinner(spinner);
  }, delay);
}

document.getElementById("postForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var postContent = document.getElementById("postContent").value;
  addPost(username, postContent);
  document.getElementById("postForm").reset();
});

function addPost(username, content) {
  var postList = document.getElementById("postList");
  var post = document.createElement("div");
  post.className = "post";
  var postUsername = document.createElement("div");
  postUsername.className = "username";
  postUsername.textContent = username;
  var postContent = document.createElement("div");
  postContent.className = "content";
  postContent.textContent = content;
  post.appendChild(postUsername);
  post.appendChild(postContent);
  postList.appendChild(post);
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installButton').style.display = 'block';
});

function promptPWAInstall() {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
}

document.getElementById('installButton').addEventListener('click', promptPWAInstall);

function filterCategories(query) {
  var categories = document.querySelectorAll("nav ul li a");
  categories.forEach(function(category) {
    var text = category.textContent.toLowerCase();
    if (text.includes(query)) {
      category.style.display = "block";
    } else {
      category.style.display = "none";
    }
  });
}

function displayRecommendedGames() {
  var recommendedGames = ["EaglerCraft", "Cookie-Clicker", "1v1.lol"];
  var container = document.getElementById("recommendedGames");
  container.innerHTML = "";
  recommendedGames.forEach(function(game) {
    var gameElement = document.createElement("div");
    gameElement.className = "recommended-game";
    gameElement.textContent = game;
    container.appendChild(gameElement);
  });
}

document.getElementById("reviewForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("reviewUsername").value;
  var reviewContent = document.getElementById("reviewContent").value;
  var reviewRating = document.getElementById("reviewRating").value;
  addReview(username, reviewContent, reviewRating);
  document.getElementById("reviewForm").reset();
});

function addReview(username, content, rating) {
  var reviewsList = document.getElementById("reviewsList");
  var review = document.createElement("div");
  review.className = "review";
  var reviewUsername = document.createElement("div");
  reviewUsername.className = "username";
  reviewUsername.textContent = username;
  var reviewContent = document.createElement("div");
  reviewContent.className = "content";
  reviewContent.textContent = content;
  var reviewRating = document.createElement("div");
  reviewRating.className = "rating";
  reviewRating.textContent = "Rating: " + rating;
  review.appendChild(reviewUsername);
  review.appendChild(reviewContent);
  review.appendChild(reviewRating);
  reviewsList.appendChild(review);
}

function displayAchievements(achievements) {
  var achievementsList = document.getElementById("achievementsList");
  achievementsList.innerHTML = "";
  achievements.forEach(function(achievement) {
    var achievementElement = document.createElement("li");
    achievementElement.className = "achievement";
    achievementElement.textContent = achievement;
    achievementsList.appendChild(achievementElement);
  });
}

function displayLeaderboards(leaderboards) {
  var leaderboardsList = document.getElementById("leaderboardsList");
  leaderboardsList.innerHTML = "";
  leaderboards.forEach(function(leaderboard) {
    var leaderboardElement = document.createElement("li");
    leaderboardElement.className = "leaderboard";
    leaderboardElement.textContent = leaderboard;
    leaderboardsList.appendChild(leaderboardElement);
  });
}

function displayCommunityEvents(events) {
  var eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = "";
  events.forEach(function(event) {
    var eventElement = document.createElement("div");
    eventElement.className = "event";
    eventElement.innerHTML = `
      <h3><img src="images/game-icon.png" alt="Game Icon"> ${event.title} 🎉</h3>
      <p>${event.description} 🎲</p>
      <img src="images/game-controller.png" alt="Game Controller">
    `;
    eventsList.appendChild(eventElement);
  });
}

// Check if any references to login.html exist and remove them
function removeLoginReferences() {
  var elements = document.querySelectorAll("a[href='login.html']");
  elements.forEach(function(element) {
    element.remove();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  removeLoginReferences();
});

function animateProgressBar(progressBarFill, duration) {
  var startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    progressBarFill.style.width = (progress * 100) + "%";
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// WebSocket connection and real-time chat handling
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
  console.log('Connected to WebSocket server');
  fetchRecentChats();
});

socket.addEventListener('message', function (event) {
  const message = JSON.parse(event.data);
  displayMessage(message.username, message.content, message.timestamp);
});

document.getElementById('chatForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value;
  const timestamp = new Date().toLocaleTimeString();
  socket.send(JSON.stringify({ username: 'Player', content: message, timestamp: timestamp }));
  chatInput.value = '';
});

function displayMessage(username, content, timestamp) {
  const chatWindow = document.getElementById('chatWindow');
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `<strong>${username}:</strong> ${content} <span class="timestamp">${timestamp}</span>`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function fetchRecentChats() {
  fetch('/recent-chats')
    .then(response => response.json())
    .then(chats => {
      const recentChatsList = document.getElementById('recentChatsList');
      recentChatsList.innerHTML = '';
      chats.forEach(chat => {
        displayMessage(chat.username, chat.content, chat.timestamp);
      });
    });
}

// Emoji selection and display
document.getElementById('emojiButton').addEventListener('click', function() {
  const emojiMenu = document.getElementById('emojiMenu');
  emojiMenu.style.display = emojiMenu.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('#emojiMenu span').forEach(function(emoji) {
  emoji.addEventListener('click', function() {
    const chatInput = document.getElementById('chatInput');
    chatInput.value += emoji.textContent;
    document.getElementById('emojiMenu').style.display = 'none';
  });
});

// Typing indicator
let typingTimeout;
const typingIndicator = document.getElementById('typingIndicator');

document.getElementById('chatInput').addEventListener('input', function() {
  clearTimeout(typingTimeout);
  socket.send(JSON.stringify({ typing: true }));
  typingTimeout = setTimeout(() => {
    socket.send(JSON.stringify({ typing: false }));
  }, 1000);
});

socket.addEventListener('message', function(event) {
  const data = JSON.parse(event.data);
  if (data.typing) {
    typingIndicator.style.display = 'block';
  } else {
    typingIndicator.style.display = 'none';
  }
});

// New function to handle chat form submission
function handleChatFormSubmit(event) {
  event.preventDefault();
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value;
  const timestamp = new Date().toLocaleTimeString();
  socket.send(JSON.stringify({ username: 'Player', content: message, timestamp: timestamp }));
  chatInput.value = '';
}
