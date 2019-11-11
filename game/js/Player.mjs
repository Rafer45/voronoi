
import * as THREE from './libs/thr.js';

function Player(cell, controls) {

  const speed = 1;

  this.wantsUp = false;
  this.wantsLeft = false;
  this.wantsDown = false;
  this.wantsRight = false;

  const movementActions = {
    [controls['up']]: (x) => { this.wantsUp = x },
    [controls['left']]: (x) => { this.wantsLeft = x },
    [controls['down']]: (x) => { this.wantsDown = x },
    [controls['right']]: (x) => { this.wantsRight = x }
  }

  this.onKeyDown = (event) => {
    const { code } = event;
    if (movementActions.hasOwnProperty(code)) {
      movementActions[code](true);
    }
  }

  this.onKeyUp = (event) => {
    const { code } = event;
    if (movementActions.hasOwnProperty(code)) {
      movementActions[code](false);
    }
  }

  this.update = (deltaTime) => {
    if (this.wantsUp) {
      cell.mesh.translateY(speed*deltaTime);
    }
    if (this.wantsLeft) {
      cell.mesh.translateX(-speed*deltaTime);
    }
    if (this.wantsDown) {
      cell.mesh.translateY(-speed*deltaTime);
    }
    if (this.wantsRight) {
      cell.mesh.translateX(speed*deltaTime);
    }
  }
}

export { Player }
