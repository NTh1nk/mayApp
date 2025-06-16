import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import "../css/style.css";

export function initSlider(id = 'slider', outputId = 'output') {
  const sliderElement = document.getElementById(id);
  const outputElement = document.getElementById(outputId);

  if (!sliderElement || !outputElement) {
    console.warn("Slider or output element not found.");
    return;
  }

  // Load saved values if they exist, otherwise use default
  const savedRange = JSON.parse(localStorage.getItem('availabilityRange'));
  const defaultRange = [8, 20];
  const initialRange = savedRange || defaultRange;

  noUiSlider.create(sliderElement, {
    start: initialRange,
    connect: true,
    step: 1,
    range: {
      min: 0,
      max: 24
    },
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
  });

  const formatTime = val => String(val).padStart(2, '0') + ':00';

  // Initial update of output display
  outputElement.textContent = `Available: ${formatTime(initialRange[0])} – ${formatTime(initialRange[1])}`;

  // Listen for updates and save to localStorage
  sliderElement.noUiSlider.on('update', ([start, end]) => {
    outputElement.textContent = `Available: ${formatTime(start)} – ${formatTime(end)}`;
    localStorage.setItem('availabilityRange', JSON.stringify([start, end]));
    localStorage.setItem('workStart', start * 60); // convert to minutes
    localStorage.setItem('workEnd', end * 60);
  });
}
