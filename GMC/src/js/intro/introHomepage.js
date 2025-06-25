import introJs from 'intro.js';
import 'intro.js/introjs.css';
import '../../css/introHomepage.css'; 

window.addEventListener('DOMContentLoaded', () => {
  const intro = introJs();

  intro.setOptions({
    steps: [
      {
        intro: 'Welcome to GMC – Global Meeting Coordinator. Let’s take a quick tour!',
      },
      {
        element: document.querySelector('.sidebar'),
        intro: 'This is your control panel. You can input locations, set availability, and compute optimal times.',
      },
      {
        element: document.querySelector('#location'),
        intro: 'Enter a location you want to include in the meeting.',
      },
      {
        element: document.querySelector('#slider'),
        intro: 'Use this slider to define your availability range.',
      },
      {
        element: document.querySelector('#calcBtn'),
        intro: 'Click here to calculate the Optimal Meeting Time (OMT).',
      },
      {
        element: document.querySelector('#omtResult'),
        intro: 'Here is where the calculated meeting time will be shown.',
      },
      {
        element: document.querySelector('#peopleTable'),
        intro: 'This table shows the added locations and the number of people at each.',
      },
      {
        element: document.querySelector('#globeViz'),
        intro: 'And here is the globe visualization of your participants.',
      },
      {
        element: document.querySelector('#openCanvasBtn'),
        intro: 'Click this to expand the chart view with time zone data.',
      }
    ],
    showProgress: true,
    showBullets: false,
    hidePrev: true,
    overlayOpacity: 0.6,
    nextLabel: 'Next',
    prevLabel: 'Back',
    doneLabel: 'Finish',
  });

  // Start the tour
  intro.start();
});
