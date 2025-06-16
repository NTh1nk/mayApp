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

  noUiSlider.create(sliderElement, {
    start: [8, 20],
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

  sliderElement.noUiSlider.on('update', ([start, end]) => {
    const formatTime = val => String(val).padStart(2, '0') + ':00';
    outputElement.textContent = `Available: ${formatTime(start)} – ${formatTime(end)}`;
  });
}