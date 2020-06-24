function openNav() {
  const navbar = document.getElementById("navbar");
  navbar.style.width = window.innerWidth > 600 ? "30%" : "100%";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0%";
}
