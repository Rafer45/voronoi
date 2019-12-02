
import * as THREE from './libs/thr.js';

// Replaces update function when cell shouldn't listen to regular updates
//   so that it does nothing every frame.
function nop() {
  // do nothing
}

function VoronoiCell(scene, color, x, y) {
  if (color.isColor) color = color.getHex();
  const cellMesh = new THREE.Object3D();

  const coneRadius = 5;
  const coneHeight = 1;
  const coneSegments = 64;
  const cone = new THREE.ConeGeometry(coneRadius, coneHeight, coneSegments, 1, true);
  const coneMesh = makeMesh(cone, color)

  const dotRadius = 0.02;
  const dotSegments = 32;
  const dot = new THREE.CircleGeometry(dotRadius, dotSegments);
  const dotMesh = makeMesh(dot, 0xFFFFFF);

  cellMesh.add(dotMesh);
  cellMesh.add(coneMesh);

  placeOnScene(scene, cellMesh, x, y);

  coneMesh.lookAt(new THREE.Vector3(x, y, 5))
  coneMesh.rotation.x = 1.57;
  coneMesh.position.z = -2
  dotMesh.position.z = -1;

  this.mesh = cellMesh;

  const tShift = Math.random()*2*Math.PI;
  const speed = Math.random()*0.9 + 0.01;
  const amplitude = Math.random()*0.6 + 0.1;

  // Used so the voronoi cell initially appears at its x, y coordinate
  const ampSinTShift = amplitude*Math.sin(tShift);
  let lifeTime = 0;

  function sinUpdate(deltaTime) {
    lifeTime += deltaTime;

    // For sinusoidal movement, use cosine speed every frame
    // a*sin(kx + s) = a*k*cos(kx + s) 
    let xDelta = amplitude*speed*Math.cos(lifeTime*speed + tShift)*deltaTime;
    this.mesh.translateX(xDelta);
  }

  this.update = sinUpdate;

  this.ToggleMoving = () => {
    if (this.update === nop) {
      this.update = sinUpdate;
    } else {
      this.update = nop;
    }
  }

  this.SetColor = (colorHex) => {
    this.mesh.children[1].material.color.setHex(colorHex);
  }

  this.RestoreColor = () => {
    this.SetColor(color);
  }
}

// TODO: Move this somewhere else so it can be used by other files
function makeMesh(geometry, color) {
  const material = new THREE.MeshBasicMaterial({color});
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

// TODO: Move this somewhere else so it can be used by other files
function placeOnScene(scene, mesh, x, y) {
  scene.add(mesh);

  mesh.position.x = x;
  mesh.position.y = y;

  return mesh;
}

export { VoronoiCell }
