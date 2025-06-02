import { showWelcomeMessage, logout } from './profile';

window.addEventListener("DOMContentLoaded", () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  document.getElementById("g_id_onload").setAttribute("data-client_id", clientId);

  // Show profile if already logged in
  showWelcomeMessage();

  // Optional logout button setup
  const logoutBtn = document.getElementById('logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});

// Google login callback
window.handleCredentialResponse = (response) => {
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  localStorage.setItem('userName', data.name || '');
  showWelcomeMessage(); // Update the message using your helper
};