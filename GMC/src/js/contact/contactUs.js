document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const response = await fetch('/api/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        form.innerHTML = `<p style="color:green;">Thank you, ${name}! Your message has been sent.</p>`;
      } else {
        form.innerHTML = `<p style="color:red;">Sorry, there was a problem sending your message.</p>`;
      }
    } catch (error) {
      form.innerHTML = `<p style="color:red;">Network error. Please try again later.</p>`;
    }
  });
});