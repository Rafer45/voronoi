
import { VoronoiField } from './VoronoiField.mjs'
import * as THREE from './libs/thr.js';

function SceneManager(canvas) {

  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }

  const scene = buildScene();
  const renderer = buildRenderer(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    return scene;
  }

  function buildRenderer({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false,
      alpha: false
    });

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function buildCamera({ width, height }) {
    const near = 0;
    const far = 200;
    const camera = new THREE.OrthographicCamera(-2, 2, 3, -3, near, far);
    camera.position.z = -1;
    return camera;
  }

  function createSceneSubjects(scene) {
    console.log("CREATESCENESUBS");
    const sceneSubjects = [
      new VoronoiField(scene)
      // new Player(scene),
      // new Player(scene)
    ]

    return sceneSubjects;
  }

  let elapsedTime = clock.getElapsedTime();

  this.update = () => {
    const deltaTime = clock.getElapsedTime() - elapsedTime;
    elapsedTime = clock.getElapsedTime();

    for (const sceneSubject of sceneSubjects) {
      sceneSubject.update(deltaTime, elapsedTime);
    }

    renderer.render(scene, camera);
  }

  this.onWindowResize = () => {
    console.log("need resize!")
    const { clientWidth, clientHeight } = canvas;
    const width = clientWidth;
    const height = clientHeight;

    renderer.setSize(width, height, false);

    const camHeight = camera.top - camera.bottom;
    const camWidth = camHeight * (width / height);
    camera.left = -camWidth / 2
    camera.right = camWidth / 2
    camera.updateProjectionMatrix();
  }

  this.onMouseClick = (event) => {
    console.log("mouse clicked!");

    clickPointToWorldPoint(event.clientX, event.clientY);

    for (let sceneSubject of sceneSubjects) {
      sceneSubject.onMouseClick({ position: pos });
    }
  }

  this.onKeyDown = (event) => {
    // Skip repeats, we never want them in game input
    if (event.repeat) return;

    for (const sceneSubject of sceneSubjects) {
      sceneSubject.onKeyDown(event);
    }
  }

  this.onKeyUp = (event) => {
    for (const sceneSubject of sceneSubjects) {
      sceneSubject.onKeyUp(event);
    }
  }

  // Assumes we have a top-down orthographic camera.
  // Takes the coordinate of a click on the window.
  // Returns the coordinate of the corresponding world point
  //   in the z=0 plane.
  // TODO: Move this somewhere where it can be more broadly used.
  const pos = new THREE.Vector3(); // pos defined outside for memory efficiency
  function clickPointToWorldPoint(x, y) {
    const { clientWidth, clientHeight } = canvas;
    const width = clientWidth;
    const height = clientHeight;

    pos.set(
       (x / width) * 2 - 1,
      -(y / height) * 2 + 1,
      0);

    pos.unproject(camera);
    return pos;
  }
}

export { SceneManager }
