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
});
