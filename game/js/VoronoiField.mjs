
import { VoronoiCell } from './VoronoiCell.mjs'
import * as THREE from './libs/thr.js';

function VoronoiField(scene) {
  const voronoiCount = 20;
  const cells = [];

  const field = new THREE.Object3D();
  
  const color = new THREE.Color();
  color.setHSL(Math.random(), 0.5, 0.6);

  for (let i = 0; i < voronoiCount; i++) {
    console.log(i);
    color.offsetHSL(1.0/voronoiCount, 0, 0);
    let x = Math.random()*6 - 3;
    let y = Math.random()*3 - 1.5;
    let cell = new VoronoiCell(scene, color, x, y)

    cells.push(cell);

    field.attach(cell.mesh);
  }

  this.update = (deltaTime, elapsedTime) => { 
    for (let cell of cells) {
      cell.update(deltaTime, elapsedTime);
    }
  }

  this.onMouseClick = (event) => {
    console.log(field.position);
    console.log("goes to");
    console.log(event.position);
    field.position.copy(event.position);
  }
}

export { VoronoiField }