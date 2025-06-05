import { showProfile, logout } from "./profile.js";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("g_id_onload").setAttribute("data-client_id", clientId);
});

// Google login callback
window.handleCredentialResponse = (response) => {
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  console.log("User data received:", data);
  // Store user data in localStorage
  localStorage.setItem('userName', data.name || '');
  localStorage.setItem('userEmail', data.email || '');
  localStorage.setItem('userPicture', data.picture || '');
  alert(`Welcome, ${data.name}!`);
  
};


//showProfile();