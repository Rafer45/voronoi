
import { Player } from './Player.mjs'
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

  // PLAYER ONE
  // TODO: don't use hardcoded colors or controls or xy values (?)
  const playerOneCell = newCell(0xFF0000, 1, 1);

  // TODO: It's a little weird that we are making a cell and
  //   forcing it to stop moving. Maybe move the sine-wave update
  //   to somewhere other than the cell?
  playerOneCell.ToggleMoving();

  const playerOneControls = {
    'up': 'KeyW',
    'left': 'KeyA',
    'down': 'KeyS',
    'right': 'KeyD'
  }
  const playerOne = new Player(playerOneCell, playerOneControls);

  const playerTwoCell = newCell(0x00FFFF, -1, -1);

  playerTwoCell.ToggleMoving();

  const playerTwoControls = {
    'up': 'ArrowUp',
    'left': 'ArrowLeft',
    'down': 'ArrowDown',
    'right': 'ArrowRight'
  }
  const playerTwo = new Player(playerTwoCell, playerTwoControls);

  // PLAYER TWO
  // TODO: player two

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

    playerOne.update(deltaTime);
    playerTwo.update(deltaTime);
  }

  this.onMouseClick = (event) => {
    newCell(0x000000, event.position.x, event.position.y);
  }

  this.onKeyDown = (event) => {
    playerOne.onKeyDown(event);
    playerTwo.onKeyDown(event);
  }

  this.onKeyUp = (event) => {
    playerOne.onKeyUp(event);
    playerTwo.onKeyUp(event);
  }
}

export { VoronoiField }