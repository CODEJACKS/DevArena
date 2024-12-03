alert("Welcome!!!");

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  const navLinks = navbar.querySelectorAll("a");

  navLinks.forEach(link => {
    link.addEventListener("mouseover", function() {
      link.style.backgroundColor = "#555";
      link.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });

    link.addEventListener("mouseout", function() {
      link.style.backgroundColor = "";
      link.style.boxShadow = "";
    });
  });

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmasDate = new Date(currentYear, 11, 25); // December 25th
    const timeDifference = christmasDate - now;
    const daysUntilChristmas = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').innerText = `${daysUntilChristmas} days until Christmas!`;
  }

  updateCountdown();
  setInterval(updateCountdown, 86400000); // Update every 24 hours
});

function displayFeaturedGame() {
  const gameUrls = [
    "https://codejacks.github.io/DevArena/games/eaglercraft.1.8.8.html",
    "https://codejacks.github.io/DevArena/games/delaford.html",
    "https://codejacks.github.io/DevArena/games/cookie-clicker.html",
    "https://codejacks.github.io/DevArena/games/geometrydash.html",
    "https://codejacks.github.io/DevArena/games/gunspin.html",
    "https://codejacks.github.io/DevArena/games/1v1.lol.html",
    "https://codejacks.github.io/DevArena/games/Snowrider 3d.html",
    "https://codejacks.github.io/DevArena/games/polytrack.html",
    "https://codejacks.github.io/DevArena/games/retrobowl.html",
    "https://codejacks.github.io/DevArena/games/basketrandom.html"
  ];

  const randomIndex = Math.floor(Math.random() * gameUrls.length);
  const featuredGameUrl = gameUrls[randomIndex];

  const featuredGameDiv = document.getElementById("featured-game");
  featuredGameDiv.innerHTML = `<iframe src="${featuredGameUrl}" style="width:100%; height:500px;"></iframe>`;
}
