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
