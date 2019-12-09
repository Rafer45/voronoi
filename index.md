
## The game
Try the game [here](https://rafer45.github.io/voronoi/game/)!

## Description

Valorous Voronoi is a two-player arcade battle game prototype set on a dynamically rendered Voronoi diagram. It involves two players, Red and Blue. The goal of each player is to destroy the other player.

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

A Voronoi diagram is a diagram made by taking a set of core points and assigning one region of space to each core point. Each core point is associated with all points closest to it by some metric (usually euclidean distance).

Voronoi diagrams have applications in art, robotics, epidemiology, among other fields. There are different algorithms to build Voronoi diagrams. One surprisingly simple method uses cones and an orthographic camera. The recipe for a Voronoi diagram with *n* cells goes like this:

1. Create *n* cones with the same height and the same width. They should be very wide.
2. Put all the cone tips at the same distance from the camera.
3. Point all the cone tips so they are looking at the camera.
4. Done! The tip of each cone corresponds to a Voronoi core.

The dual of a Voronoi diagram is called a Delaunay Triangulation. It has independently interesting properties (for instance, it maximizes the minimum angle), but for our purposes, we only care about its role as the dual. It is the graph made by connecting the Voronoi cores of cells that are adjacent to each other.

There are fast algorithms to generate Delaunay triangulations independently from generating the Voronoi diagram. One can use such an algorithm to compute the dual of the Voronoi, allowing for quick collision checks between cells.

## Challenges

Surprisingly, the biggest challenges involved architecture and keyboard/mouse IO, not geometry. While architecture is always a challenge in game development, I had taken for granted how easy keyboard/mouse IO is made by game engines. Communicating mouse and keyboard events correctly, without painting myself into a corner but without overthinking the architecture too much, took me a few weeks (combined with other homework).

## Easy bits

Drawing the Voronoi diagram was very easy, and the Delaunay triangulation library I used worked perfectly on the first try. Once keyboard inputs were correctly getting piped to the entities, adding new actions was easy.

## The Future

Voronoi diagrams are an underexplored tool in game design. For instance, a stealth game using dynamic Voronoi diagrams for the world and the characters would be interesting. The diagrams fully fill the world, so they give the opportunity to explore what gameplay could be like in a world without gaps between things.

## References
1. [three.js](https://threejs.org/)
2. Wikipedia contributors, "Voronoi diagram," *Wikipedia, The Free Encyclopedia*. [Link](https://en.wikipedia.org/wiki/Voronoi_diagram)
3. Wikipedia contributors. Delaunay triangulation. In *Wikipedia, The Free Encyclopedia*. [Link](https://en.wikipedia.org/wiki/Delaunay_triangulation)
4. Soffritti, P. How to organize your Three.js code in a cleaner way. [Link](https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f).
