export function showProfile( ) {
    const userName = localStorage.getItem("userName");
    const welcomeEl =  document.getElementById("welcomeMessage");

    if (welcomeEl && userName) {
        welcomeEl.textContent = `Welcome, ${userName}!`;
    }

}


export function logout() {
    localStorage.removeItem("userName");
    const welcomeEl = document.getElementById("welcomeMessage");
    if (welcomeEl) {
        welcomeEl.textContent = "You have been logged out.";
    }
    // Optionally, redirect to the login page or refresh the page
    window.location.reload();
}

