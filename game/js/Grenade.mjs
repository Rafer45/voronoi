
import * as THREE from './libs/thr.js';

function Grenade(cell, birthVel) {

  const vel = birthVel;
  const decayFactor = 2;
  this.neighbors = [];
  this.active = true
  this.detonatedThisFrame = false
  this.baseMaster = null

  this.update = (deltaTime) => {
    this.detonatedThisFrame = false
    cell.mesh.translateX(vel.x*deltaTime)
    cell.mesh.translateY(vel.y*deltaTime)

    if (vel.lengthSq() < 0.001 && this.active) {
      detonate(this);
      vel.set(0,0)
    } else {
      vel.multiplyScalar(1 - deltaTime*decayFactor)
    }
  }

  function detonate(self) {
    for (const neighbor of self.neighbors) {
      neighbor.PseudoDestroy()
    }
    self.detonatedThisFrame = true
    defuse(self)
  }

  // TODO: defuse should disappear the nade
  function defuse(self) {
    self.active = false
  }

  this.cell = () => cell
}

export { Grenade }
