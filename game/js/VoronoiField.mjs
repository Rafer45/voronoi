
import { VoronoiCell } from './VoronoiCell.mjs'
import * as THREE from './libs/thr.js';

function VoronoiField(scene) {
  const voronoiCount = 50;
  const cells = [];

  const field = new THREE.Object3D();
  
  const color = new THREE.Color();
  color.setHSL(Math.random(), 0.5, 0.6);

  for (let i = 0; i < voronoiCount; i++) {
    console.log(i);
    color.offsetHSL(1.0/voronoiCount, 0, 0);
    let x = Math.random()*6 - 3;
    let y = Math.random()*3 - 1.5;

    newCell(color, x, y);
  }

  scene.add(field);

  function newCell(color, x, y) {
    let cell = new VoronoiCell(scene, color, x, y)

    cells.push(cell);
    field.attach(cell.mesh);
    return cell
  }

  this.update = (deltaTime, elapsedTime) => { 
    for (let cell of cells) {
      cell.update(deltaTime, elapsedTime);
    }
  }

  this.onMouseClick = (event) => {
    newCell(0x000000, event.position.x, event.position.y)
  }
}

export { VoronoiField }