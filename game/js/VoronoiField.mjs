
import { Player } from './Player.mjs'
import { VoronoiCell } from './VoronoiCell.mjs'
import { Grenade } from './Grenade.mjs'
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
  const luminantCells = [];
  const luminantNeighbors = {};
  const activeGrenades = [];
  const inactiveGrenades = [];


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
  const playerOneCell = newCell(0x551111, 0.25*(Math.random()*width) + 0.2*width, 0.25*(Math.random()*height) + 0.2*height);

  // TODO: It's a little weird that we are making a cell and
  //   forcing it to stop moving. Maybe move the sine-wave update
  //   to somewhere other than the cell?
  playerOneCell.ToggleMoving();

  const playerOneControls = {
    'up': 'ArrowUp',
    'left': 'ArrowLeft',
    'down': 'ArrowDown',
    'right': 'ArrowRight',
  }
  const playerOne = new Player(playerOneCell, playerOneControls, 1.5);
  luminify(playerOne.cell())

  const playerTwoCell = newCell(0x053333, -0.25*(Math.random()*width) - 0.2*width, -0.25*(Math.random()*height) - 0.2*height, true);
  // playerTwoCell.ToggleMoving();

  const playerTwoControls = {
    'up': 'KeyW',
    'left': 'KeyA',
    'down': 'KeyS',
    'right': 'KeyD',
  }
  const playerTwo = new Player(playerTwoCell, playerTwoControls, 1);
  luminify(playerTwo.cell())
  // const playerTwoCellId = cells.length - 1;
  // playerTwoCell.mesh.visible = true;

  function newCell(color, x, y, sdu=false) {
    let cell = new VoronoiCell(scene, color, x, y, cells.length, sdu)

    cells.push(cell);
    field.attach(cell.mesh);

    cell.SetColor(0);

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

    for (const luminantCell of luminantCells) {
      if (luminantCell.pseudoDestroyed) continue;
      const id = luminantCell.id()
      for (const neighbor of luminantNeighbors[id]) {
        const neighborCell = cells[neighbor]
        if (luminantCell !== playerTwo.cell()) {
          if (!playerTwo.cell().pseudoDestroyed) {
            neighborCell.SetColor(0);
          }
        } else {
          if (neighborCell === playerOne.cell()) {
            neighborCell.PseudoDestroy()
          }
        }
      }

      luminantNeighbors[id] = DU.pointsAroundPoint(this.delaunay, id);
      for (const neighbor of luminantNeighbors[id]) {
        const neighborCell = cells[neighbor]
        if (luminantCell !== playerTwo.cell() || playerOne.cell().pseudoDestroyed)
          neighborCell.RestoreColor();
      }
    }

    for (const luminantCell of luminantCells) {
      if (luminantCell !== playerTwo.cell() || playerOne.cell().pseudoDestroyed)
        luminantCell.RestoreColor()
    }

    for (let nade of activeGrenades) {
      nade.neighbors = luminantNeighbors[nade.cell().id()].map(x => cells[x])
      nade.update(deltaTime)
      if (nade.detonatedThisFrame) {
        // nade detonated
        activeGrenades.pop()
        inactiveGrenades.push(nade)
        thereIsGrenade = false
        nade.cell().HardSetColor(0x444444)
      }
    }

    for (let nade of inactiveGrenades) {
      if (luminantNeighbors[playerTwo.cell().id()].includes(nade.cell().id()) &&
        !playerTwo.cell().pseudoDestroyed) {
        if (nade.baseMaster === playerOne) {
          playerTwoCell.PseudoDestroy()
        } else {
          nade.cell().HardSetColor(0x11CCCC)
          nade.baseMaster = playerTwo
        }
      } else if (luminantNeighbors[playerOne.cell().id()].includes(nade.cell().id()) &&
        !playerOne.cell().pseudoDestroyed) {
        if (nade.baseMaster === playerTwo) {
          playerOneCell.PseudoDestroy()
        } else {
          nade.cell().HardSetColor(0xCC2222)
          nade.baseMaster = playerOne
        }
      }
    }
  }

  let thereIsGrenade = false
  const dir = new THREE.Vector2();

  this.onMouseClick = (event) => {
    if (!thereIsGrenade) {
      console.log(playerOne.cell().mesh.position)
      // debugger;
      const grCell = newCell(0xFF0000, playerOne.cell().mesh.position.x+0.0001, playerOne.cell().mesh.position.y+0.0001);
      grCell.StopMoving();
      dir.subVectors(event.position, grCell.mesh.position);
      const grenade = new Grenade(grCell, dir);
      activeGrenades.push(grenade)

      luminify(grCell)

      thereIsGrenade = true;
    }
  }

  this.onKeyDown = (event) => {
    playerOne.onKeyDown(event);
    playerTwo.onKeyDown(event);
  }

  this.onKeyUp = (event) => {
    playerOne.onKeyUp(event);
    playerTwo.onKeyUp(event);
  }

  function luminify(cell) {
    luminantCells.push(cell)
    luminantNeighbors[cell.id()] = [];
  }

  function deluminify(cell) {
    luminantCells = luminantCells.filter(item => item !== cell)
    luminantNeighbors[cell.id()] = [];
  }
}

export { VoronoiField }