
## Description

Valorous Voronoi is a two-player arcade battle game set on a dynamically rendered Voronoi diagram. It involves two players, Red and Blue. The goal of each player is to destroy the other player.

Red is visible and illuminates neighboring cells. Red can shoot grenades that also illuminate neighbors. They detonate after a short while, destroying neighboring cells and creating a base.

Any cell that isn't illuminated is dark. Dark cells are all the same color, so they blend together and cannot easily be told apart. Blue is a dark cell, so it is harder to spot, but it is also slower than Red.

Bases created by grenades can be captured by Red or Blue. A captured base can be used to destroy one's opponent.

There are three rules for player destruction

1. If Blue touches Red, Red is destroyed.
2. If a player is caught in a grenade explosion, that player dies.
3. If a player touches an opponent's base, that player dies.

## Technology
Valorous Voronoi uses the following technologies:
* [three.js](https://threejs.org/) for rendering.
* [Delaunator](https://github.com/mapbox/delaunator) for Delaunay triangulation.

## Geometry

A Voronoi diagram is a diagram made by taking a set of base points and assigning one region of space to each base point. Each base point is associated with all points closest to it by some metric (usually euclidean distance).

Voronoi diagrams have applications in art, robotics, epidemiology, among other fields. There are different algorithms to build Voronoi diagrams. One surprisingly simple method uses cones and an orthographic camera. The recipe for a Voronoi diagram with *n* cells goes like this:

1. Create *n* cones with the same height and the same width. They should be very wide.
2. Point all the cone tips so they are looking at the camera.
3. Put all the cone tips at the same distance from the camera.

## References
1. [three.js](https://threejs.org/)
2. Wikipedia contributors, "Voronoi diagram," *Wikipedia, The Free Encyclopedia*. [Link](https://en.wikipedia.org/wiki/Voronoi_diagram)
3. Wikipedia contributors. Delaunay triangulation. In *Wikipedia, The Free Encyclopedia*. [Link](https://en.wikipedia.org/wiki/Delaunay_triangulation)
4. Soffritti, P. How to organize your Three.js code in a cleaner way. [Link](https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f).
