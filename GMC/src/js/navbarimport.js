export function loadNavbar(placeholderId="navbar-placeholder") {   
   fetch("/html/navbar.html")
        .then(res => res.text())
        .then(html => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
            }
        });
}


export function loadBottomBar(placeholderId="bottombar-placeholder") {   
   fetch("/html/bottombar.html")
        .then(res => res.text())
        .then(html => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
            }
        });
}