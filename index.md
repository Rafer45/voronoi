
## Description

Valorous Voronoi is a two-player arcade battle game set on a dynamically rendered Voronoi diagram. Each player is associated with one color. The game is played in two phases: setup and combat. During setup, each player puts 5 bases on the screen, with no knowledge of where the opponent placed bases before they place them. Think *Battleship*. The location of each base is then revealed, and a Voronoi diagram is drawn, using each base as a point for the diagram. The cells are filled in with the base owner's color.

The combat phase then begins. Both players can move around the field. Players can hit their own bases to move them, affecting the shape of the diagram. Players themselves may be treated as points for their own bases. Other concrete aspects of the combat phase will be arrived at with experimentation. As an example of a possible mechanic: players may be the same color as the background of their bases, making them invisible against their own background. What is currently set in stone is that players will fight on the diagram and that the diagram will dynamically change through the round.

## Technology
Valorous Voronoi will use [pixiJS](https://www.pixijs.com/) for rendering.

## Schedule

Week | Milestone
---- | ---------
4    | Make project website
5    | Learn to use PixiJS (Complete the demos in pixiJS website)
6    | Compute static randomly generated Voronoi diagram
7    | Render static randomly generated Voronoi diagram
8    | Render filled in diagram from dropped points
9    | Add players
10   | Treat players as Voronoi points
11   | Let players attack each other and each other's bases (ballistic physics for bases)
12   | Add sound effects
13   | Add start menu
14   | Add particle effects, screenshake, randomized initial colors
15   | Buffer week

## References
1. [pixiJS](https://www.pixijs.com/)
2. Wikipedia contributors, "Voronoi diagram," *Wikipedia, The Free Encyclopedia*. [Link](https://en.wikipedia.org/wiki/Voronoi_diagram)
