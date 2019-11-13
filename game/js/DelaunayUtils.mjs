
import Delaunator from './node_modules/delaunator/index.js';

function nextHalfedge(e) {
  return (e % 3 === 2) ? e - 2 : e + 1;
}

function prevHalfedge(e) {
  return (e % 3 === 0) ? e + 2 : e - 1;
}

// TODO: good comment
// Takes the id of some point p.
// Finds the id of some half edge that is incident on that point
function findIncomingHalfedge(delaunay, p) {
  for (let e = 0; e < delaunay.triangles.length; e++) {
    const endpoint = delaunay.triangles[nextHalfedge(e)];
    if (endpoint === p)
      return e;
  }

  console.error("This shouldn't happen in DelaunayUtils.mjs : findIncomingHalfedge");
}

function edgesAroundPoint(delaunay, p) {
    const result = [];
    const start = findIncomingHalfedge(delaunay, p);
    let incoming = start;
    do {
        result.push(incoming);
        const outgoing = nextHalfedge(incoming);
        incoming = delaunay.halfedges[outgoing];

        if (incoming === -1) {
          console.error("THIS IS NOT SUPPOSED TO HAPPEN, edgesAroundPoint called on chull point")
        }
    } while (incoming !== start);
    return result;
}

function pointsAroundPoint(delaunay, p) {
  return edgesAroundPoint(delaunay, p)
      .map(e => delaunay.triangles[e]);
}


export { pointsAroundPoint }
