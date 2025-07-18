import introJs from 'intro.js';
import 'intro.js/introjs.css';
import '../../css/introHomepage.css'; 

window.addEventListener('DOMContentLoaded', () => {
  const intro = introJs();
  
  const mobileSteps = [
    {
      intro: 'Welcome to GMC! Let’s take a quick tour.',
    },
    {
      element: document.querySelector('#openMobileMenuBtn'),
      intro: 'Tap here to open the menu.',
      position: 'bottom'
    },
    {
      element: document.querySelector('#openCanvasBtn'),
      intro: 'Click this to expand the chart over meeting times',
    },
    {
      element: document.querySelector('#backLandingMobile'),
      intro: 'This is the button to return to the landing page',
    }
    // Add all elements relevant to mobile

  ];
  const desktopSteps = [
      {
        intro: 'Welcome to GMC – Global Meeting Coordinator. Let’s take a quick tour!',
      },
      {
        element: document.querySelector('.sidebar'),
        intro: 'This is your control panel. You can input locations, set availability, and compute meeting times.',
      },
      {
        element: document.querySelector('#location'),
        intro: 'Enter the location of someone you want to include in the meeting.',
      },
      {
        element: document.querySelector('#openHQBtn'),
        intro: 'Add headquarters, and use them to find the optimal meeting point (OMP)',
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
      element: document.querySelector('#calcBtn'),
        intro: 'This will also calculate the Optimal Meeting Point (OMP)',
      },
      {
        element: document.querySelector('#omtResult'),
        intro: 'Here is where the calculated meeting time will be shown.',
      },
      {
        element: document.querySelector('#ompResult'),
        intro: 'Here is where the calculated meeting point will be shown.',
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
        intro: 'Click this to expand the chart over meeting times',
      }
    ];


  intro.setOptions({
    steps: isMobile() ? mobileSteps : desktopSteps,
    showProgress: true,
    showBullets: false,
    hidePrev: true,
    overlayOpacity: 0.6,
    nextLabel: 'Next',
    prevLabel: 'Back',
    doneLabel: 'Finish',
    tooltipClass: isMobile() ? 'introjs-tooltip-mobile' : ''

  });

  // Start the tour
  intro.start();
});


export function introHQ(){
    const introHQ = introJs();

    introHQ.setOptions({
    steps: [
      {
        intro: 'Welcome to HQ overlay, lets take a quick tour!',
      },
      /*
      {
        element: document.querySelector('#hQOverlay'),
        intro: 'HQ overlay',
      },
      */
            {
        element: document.querySelector('#hQLocation'),
        intro: 'Enter the location of a headquarter.',
      },
      {
        element: document.querySelector('#openHQGraphBtn'),
        intro: 'This is where you open the graph over the total distance to the different headquarters',
      },
      {
        element: document.querySelector('#hQTable'),
        intro: 'This is the table to store the location of the headquarters',
      },
    ],
    showProgress: true,
    showBullets: false,
    hidePrev: true,
    overlayOpacity: 0.6,
    nextLabel: 'Next',
    prevLabel: 'Back',
    doneLabel: 'Finish',
  });
    
  introHQ.start();
}


export function introChart(){

    const introChart = introJs();

    introChart.setOptions({
    steps: [
      {
        intro: 'Welcome to the chart overlay, lets take a tour!',
      },
      
      {
        element: document.querySelector('#flawChart'),
        intro: 'This is the chart over the meeting times ',
      },
      {
        element: document.querySelector('#flawChart'),
        intro: 'The lower the better!',
      },                                                    
      

    ],
    showProgress: true,
    showBullets: false,
    hidePrev: true,
    overlayOpacity: 0.6,
    nextLabel: 'Next',
    prevLabel: 'Back',
    doneLabel: 'Finish',
  });
    
  introChart.start();

}

function isMobile() {
  return window.innerWidth <= 768;
}