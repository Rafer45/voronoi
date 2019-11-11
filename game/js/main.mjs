
import { SceneManager } from './SceneManager.mjs'

const canvas = document.getElementById("c");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
  window.onresize = resizeCanvas;
  window.onclick = clickMouse;
  window.onkeydown  = keyDown;
  window.onkeyup = keyUp;
  resizeCanvas();
}

function resizeCanvas() {
  sceneManager.onWindowResize();
}

function keyDown(event) {
  sceneManager.onKeyDown(event);
}

function keyUp(event) {
  sceneManager.onKeyUp(event);
}

function clickMouse(event) {
  sceneManager.onMouseClick(event);
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}
