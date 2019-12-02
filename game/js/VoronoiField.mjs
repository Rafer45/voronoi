
import { Player } from './Player.mjs'
import { VoronoiCell } from './VoronoiCell.mjs'
import * as THREE from './libs/thr.js';
import Delaunator from './node_modules/delaunator/index.js';
import * as DU from './DelaunayUtils.mjs'

console.log(Delaunator)

function VoronoiField(scene, voronoiCount, width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  // const voronoiCount = 100;

  const field = new THREE.Object3D();
  const cells = [];


  // Black cells making a convex hull outside.
  // These make voronoi collision checking a lot simpler.
  (newCell(0x000000, -width*0.8, -width*0.8)).ToggleMoving();
  (newCell(0x000000, width*0.8, -width*0.8)).ToggleMoving();
  (newCell(0x000000, width*0.8, width*0.8)).ToggleMoving();
  (newCell(0x000000, -width*0.8, width*0.8)).ToggleMoving();

  
  const color = new THREE.Color();
  color.setHSL(Math.random(), 0.5, 0.6);

  for (let i = 0; i < voronoiCount; i++) {
    console.log(i);
    color.offsetHSL(1.0/voronoiCount, 0, 0);
    let x = Math.random()*width - halfWidth;
    let y = Math.random()*height - halfHeight;

    newCell(color, x, y);
  }

  scene.add(field);

  // PLAYER ONE
  // TODO: don't use hardcoded colors or controls or xy values (?)
  // TODO: I don't like the distinction between playeronecell and playerone.cell
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
  const playerOneCellId = cells.length - 1;
  playerOneCell.mesh.visible = true;

  const playerTwoCell = newCell(0x00FFFF, -1, -1);
  // playerTwoCell.ToggleMoving();

  const playerTwoControls = {
    'up': 'ArrowUp',
    'left': 'ArrowLeft',
    'down': 'ArrowDown',
    'right': 'ArrowRight'
  }
  const playerTwo = new Player(playerTwoCell, playerTwoControls);
  const playerTwoCellId = cells.length - 1;
  // playerTwoCell.mesh.visible = true;

  function newCell(color, x, y) {
    let cell = new VoronoiCell(scene, color, x, y)

    cells.push(cell);
    field.attach(cell.mesh);

    // REMOVE PLEASE
    cell.SetColor(0);

    return cell;
  }

  let playerOneNeighbors = [];
  this.delaunay;
  this.update = (deltaTime, elapsedTime) => { 
    for (let cell of cells) {
      cell.update(deltaTime, elapsedTime);
    }

    playerOne.update(deltaTime);
    playerTwo.update(deltaTime);

    this.delaunay = Delaunator.from(cells,
      c => c.mesh.position.x,
      c => c.mesh.position.y);

    for (const neighbor of playerOneNeighbors) {
      const neighborCell = cells[neighbor]
      neighborCell.SetColor(0);
    }

    playerOneNeighbors = DU.pointsAroundPoint(this.delaunay, playerOneCellId);
    for (const neighbor of playerOneNeighbors) {
      const neighborCell = cells[neighbor]
      neighborCell.RestoreColor(0);
    }
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