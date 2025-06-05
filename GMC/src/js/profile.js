export function showProfile( ) {
    const userName = localStorage.getItem("userName");
    const welcomeEl =  document.getElementById("welcomeMessage");
    const profileEmailEl = document.getElementById("profileEmail");
    const profilePictureEl = document.getElementById("profilePicture");
    console.log("User profile initialized");

    if (!userName) {
        console.log("No user is logged in.");
        return;
    }
    if (welcomeEl && userName) {
        welcomeEl.textContent = `Welcome, ${userName}!`;
        console.log("User profile displayed:", userName);

    }
    if (profileEmailEl && profilePictureEl) {
        //Takes the stuff from local storage and displays it
        const userEmail = localStorage.getItem("userEmail");
        const userPicture = localStorage.getItem("userPicture")
        profileEmailEl.textContent = `Email: ${userEmail}`;
        profilePictureEl.innerHTML = `Profile Picture: <img id="picture" src="${userPicture}" alt="Profile Picture">`;
    }
}

    
export function logout() {
    localStorage.removeItem("userName");
    const welcomeEl = document.getElementById("welcomeMessage");
    if (welcomeEl) {
        welcomeEl.textContent = "You have been logged out.";
    }
    // Optionally, redirect to the login page or refresh the page
    console.log("User logged out");
    window.location.reload();
}


