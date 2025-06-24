document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value;
    form.innerHTML = `<p style="color:green;">Thank you, ${name}! This currently doesnt work</p>`;
    // implement backend logic
  });
});