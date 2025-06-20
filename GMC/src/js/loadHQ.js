export function loadHQ() {
  const overlay = document.getElementById("hQOverlay");
  const btn = document.getElementById("openHQBtn");
  const closeBtn = overlay.querySelector(".close");

  btn.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}
