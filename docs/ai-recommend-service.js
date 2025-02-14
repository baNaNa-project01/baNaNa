document.addEventListener("DOMContentLoaded", function () {
  const regionButtons = document.querySelectorAll(".region-btn");

  regionButtons.forEach((button) => {
      button.addEventListener("click", function () {
          this.classList.toggle("active");
      });
  });
});
