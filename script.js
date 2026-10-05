// Keep the footer current. The website content works without JavaScript.
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
