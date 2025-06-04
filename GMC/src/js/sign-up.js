import { showProfile, logout } from "./profile.js";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("g_id_onload").setAttribute("data-client_id", clientId);
});

// Google login callback
window.handleCredentialResponse = (response) => {
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  localStorage.setItem('userName', data.name || '');
  alert(`Welcome, ${data.name}!`);
};

//showProfile();