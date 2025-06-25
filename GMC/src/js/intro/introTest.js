import introJs from 'intro.js';
import 'intro.js/introjs.css';

introJs().setOptions({
  steps: [
    {
      intro: "Welcome to your app!"
    },
    {
      element: document.querySelector('#feature'),
      intro: "This highlights a feature.",
    },
  ]
}).start();