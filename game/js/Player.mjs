
import * as THREE from './libs/thr.js';
import { Grenade } from './Grenade.mjs'

function Player(cell, controls, spd) {

  const speed = spd;

  this.wantsUp = false;
  this.wantsLeft = false;
  this.wantsDown = false;
  this.wantsRight = false;
  this.wantsShoot = false;

  const controlActions = {
    [controls['up']]: (x) => { this.wantsUp = x },
    [controls['left']]: (x) => { this.wantsLeft = x },
    [controls['down']]: (x) => { this.wantsDown = x },
    [controls['right']]: (x) => { this.wantsRight = x },
    // [controls['shoot']]: (x) => { this.wantsShoot = x },
  }

  this.onKeyDown = (event) => {
    const { code } = event;
    if (controlActions.hasOwnProperty(code)) {
      controlActions[code](true);
    }
  }

  this.onKeyUp = (event) => {
    const { code } = event;
    if (controlActions.hasOwnProperty(code)) {
      controlActions[code](false);
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

    if (this.wantsShoot) {
      this.shoot()
    }
  }

  this.cell = () => cell
}

export { Player }
