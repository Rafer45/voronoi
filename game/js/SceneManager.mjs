
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

  this.update = () => {
    const elapsedTime = clock.getElapsedTime();

    for (const sceneSubject of sceneSubjects) {
      sceneSubject.update(elapsedTime);
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

  const vec = new THREE.Vector3();
  const pos = new THREE.Vector3();
  this.onMouseClick = (event) => {
    console.log("mouse clicked!");
    const { width, height } = canvas;

    vec.set(
       (event.clientX / width) * 2 - 1,
      -(event.clientY / height) * 2 + 1,
      0.5);
    console.log("ex:", event.clientX)
    console.log("w:", width)
    vec.unproject(camera);
    vec.sub(camera.position).normalize();

    const distance = -camera.position.z/vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    for (let sceneSubject of sceneSubjects) {
      sceneSubject.onMouseClick({ position: pos });
    }
  }
}

export { SceneManager }
