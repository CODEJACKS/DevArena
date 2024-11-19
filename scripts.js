document.addEventListener("DOMContentLoaded", function() {
  // Video playback controls
  const video = document.querySelector("video");
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const volumeSlider = document.getElementById("volumeSlider");

  playButton.addEventListener("click", function() {
    video.play();
  });

  pauseButton.addEventListener("click", function() {
    video.pause();
  });

  volumeSlider.addEventListener("input", function() {
    video.volume = volumeSlider.value / 100;
  });

  // User account and profile functionality
  const userProfile = document.getElementById("userProfile");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");

  function updateUserProfile(name, email) {
    userName.textContent = name;
    userEmail.textContent = email;
  }

  // Commenting and interaction functionality
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value;
    addComment(commentText);
    commentForm.reset();
  });

  function addComment(text) {
    const commentItem = document.createElement("li");
    commentItem.textContent = text;
    commentList.appendChild(commentItem);
  }

  // Video recommendations and related videos functionality
  const recommendations = document.getElementById("recommendations");
  const relatedVideos = [
    "Video 1",
    "Video 2",
    "Video 3"
  ];

  relatedVideos.forEach(function(video) {
    const videoItem = document.createElement("div");
    videoItem.textContent = video;
    recommendations.appendChild(videoItem);
  });

  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById("darkModeToggle");

  darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
});
