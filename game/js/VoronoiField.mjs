
import { VoronoiCell } from './VoronoiCell.mjs'
import * as THREE from './libs/thr.js';

function VoronoiField(scene) {
  console.log("NEW VORONONOROI FELD")
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

  scene.add(field);

  this.update = (time) => { 
    // for (let cell of cells) {}
  }

  this.onMouseClick = (event) => {
    // event.position.x = 0;
    // event.position.y = 0;
    // event.position.z = 0;
    console.log(field.position);
    console.log("goes to");
    console.log(event.position);
    field.position.copy(event.position);
  }
}

export { VoronoiField }