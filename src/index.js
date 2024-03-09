// this file will bring the logic and the DOM manipulation all together.

import "./reset.css"
import "./style.css"

function component() {
    const element = document.createElement('div');
    element.innerHTML = "Test test test";
 
    return element;
  }
 
  document.body.appendChild(component());
 