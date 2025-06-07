import '../css/loader.css';
import { loadNavbar } from '/src/js/navbarimport.js';

window.addEventListener('load', async () => {
  // Ensure loadNavbar completes before hiding loader
  await loadNavbar();

  // Now hide the loader
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';

  // Optionally show the main content if you're hiding it initially
  const content = document.getElementById('main-content');
  if (content) content.style.display = 'block';
});   