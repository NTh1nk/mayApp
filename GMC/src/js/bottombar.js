import { isDesktop } from './mobile';
import { loadBottomBar } from '/src/js/navbarimport.js';
window.addEventListener('DOMContentLoaded', () => {
  if(isDesktop(window)){
  loadBottomBar();
  }
});