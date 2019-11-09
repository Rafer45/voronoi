
import { SceneManager } from './SceneManager.mjs'

const canvas = document.getElementById("c");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
  window.onresize = resizeCanvas;
  window.onclick = clickMouse;
  resizeCanvas();
}

function resizeCanvas() {
  sceneManager.onWindowResize();
}

function clickMouse(event) {
  sceneManager.onMouseClick(event);
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}
