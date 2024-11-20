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

document.getElementById("searchBar").addEventListener("input", function(event) {
  var query = event.target.value.toLowerCase();
  var suggestions = document.getElementById("suggestions").options;
  var dropdown = document.getElementById("suggestions");
  dropdown.innerHTML = "";
  for (var i = 0; i < suggestions.length; i++) {
    var suggestion = suggestions[i].value.toLowerCase();
    if (suggestion.includes(query)) {
      var option = document.createElement("option");
      option.value = suggestions[i].value;
      dropdown.appendChild(option);
    }
  }
});

document.getElementById("searchBar").addEventListener("input", function(event) {
  var query = event.target.value.toLowerCase();
  var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (query && !recentSearches.includes(query)) {
    recentSearches.push(query);
    if (recentSearches.length > 5) {
      recentSearches.shift();
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
  displayRecentSearches();
});

function displayRecentSearches() {
  var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  var recentSearchList = document.getElementById("recentSearchList");
  recentSearchList.innerHTML = "";
  recentSearches.forEach(function(search) {
    var li = document.createElement("li");
    li.textContent = search;
    li.addEventListener("click", function() {
      document.getElementById("searchBar").value = search;
      document.getElementById("searchBar").dispatchEvent(new Event("input"));
    });
    recentSearchList.appendChild(li);
  });
}

document.getElementById("searchButton").addEventListener("click", function() {
  var query = document.getElementById("searchBar").value.toLowerCase();
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

function displayRecentSearches() {
  var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  var recentSearchList = document.getElementById("recentSearchList");
  recentSearchList.innerHTML = "";
  recentSearches.forEach(function(search) {
    var li = document.createElement("li");
    li.textContent = search;
    li.addEventListener("click", function() {
      document.getElementById("searchBar").value = search;
      document.getElementById("searchBar").dispatchEvent(new Event("input"));
    });
    recentSearchList.appendChild(li);
  });
  var dropdown = document.createElement("div");
  dropdown.className = "dropdown";
  recentSearches.forEach(function(search) {
    var option = document.createElement("div");
    option.className = "dropdown-option";
    option.textContent = search;
    option.addEventListener("click", function() {
      document.getElementById("searchBar").value = search;
      document.getElementById("searchBar").dispatchEvent(new Event("input"));
    });
    dropdown.appendChild(option);
  });
  recentSearchList.appendChild(dropdown);
}
