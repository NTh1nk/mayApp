//this get the presets from the presets.js and loader
//

export function loadPresets(){

  const overlay = document.getElementById("presetOverlay");
  const btn = document.getElementById("openPresetBtn");
  /*const closeBtn = overlay.querySelector(".close");
    */
  btn.addEventListener("click", () => {
    overlay.classList.add("active");
    


  });
  


  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
  loadHQTableFromStorage();
}






