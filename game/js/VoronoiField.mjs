
import { Player } from './Player.mjs'
import { VoronoiCell } from './VoronoiCell.mjs'
import * as THREE from './libs/thr.js';
import Delaunator from './node_modules/delaunator/index.js';
import * as DU from './DelaunayUtils.mjs'

console.log(Delaunator)

function VoronoiField(scene) {
  const voronoiCount = 50;

  const field = new THREE.Object3D();
  const cells = [];

  // Black cells making a convex hull outside.
  // These make voronoi collision checking a lot simpler.
  (newCell(0x000000, -5, -5)).ToggleMoving();
  (newCell(0x000000, 5, -5)).ToggleMoving();
  (newCell(0x000000, 5, 5)).ToggleMoving();
  (newCell(0x000000, -5, 5)).ToggleMoving();

  
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

  const playerTwoCell = newCell(0x00FFFF, -1, -1);
  playerTwoCell.ToggleMoving();

  const playerTwoControls = {
    'up': 'ArrowUp',
    'left': 'ArrowLeft',
    'down': 'ArrowDown',
    'right': 'ArrowRight'
  }
  const playerTwo = new Player(playerTwoCell, playerTwoControls);
  const playerTwoCellId = cells.length - 1;

  function newCell(color, x, y) {
    let cell = new VoronoiCell(scene, color, x, y)

    cells.push(cell);
    field.attach(cell.mesh);

    return cell;
  }

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

    console.log(DU.pointsAroundPoint(this.delaunay, playerOneCellId));
    const playerOneNeighbors = DU.pointsAroundPoint(this.delaunay, playerOneCellId);
    if (playerOneNeighbors.includes(playerTwoCellId)) {
      // TODO: This is really silly. Make some method that lets you change cell color or don't change
      // the cell color at all.
      playerOneCell.mesh.children[1].material.color.setHex(0x00FF00)
    } else {
      // TODO: This is really silly. Make some method that lets you change cell color or don't change
      // the cell color at all.
      playerOneCell.mesh.children[1].material.color.setHex(0xFF0000)
    }
    // console.log(delaunay.hull);
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