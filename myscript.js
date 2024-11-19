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

function authenticateUser(username, password) {
  if (username === "admin" && password === "adminpassword") {
    localStorage.setItem("authenticated", "true");
    return true;
  } else {
    return false;
  }
}

function checkAuthentication() {
  return localStorage.getItem("authenticated") === "true";
}

function redirectToLogin() {
  if (!checkAuthentication()) {
    window.location.href = "login.html";
  }
}
