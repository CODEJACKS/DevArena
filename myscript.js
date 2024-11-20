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
  if (username === "admin" && password === "password") {
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

// P6b95
document.getElementById("searchBar").addEventListener("input", function(event) {
  var query = event.target.value.toLowerCase();
  var links = document.querySelectorAll("nav ul li a");
  links.forEach(function(link) {
    var text = link.textContent.toLowerCase();
    if (text.includes(query)) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });
});
