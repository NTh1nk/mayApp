export function loadNavbar(placeholderId="navbar-placeholder") {   
   fetch("/src/html/navbar.html")
        .then(res => res.text())
        .then(html => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
            }
        });
}