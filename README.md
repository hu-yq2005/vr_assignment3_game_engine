# Building Your Own Game Engine, Part II

## Features

### Part 1: User Interaction

The cow can be controlled using the keyboard:

- **Arrow Keys / WASD** — Move the cow up, down, left, and right
- **Space** — Open the cow's mouth
- The cow's walking animation only plays while it is moving
- The cow changes direction when moving left or right
- Boundary checks prevent the cow from moving outside the canvas


### Part 2: Fixed Timestep and Variable Rendering

The game loop uses a fixed timestep for simulation updates:

```javascript
var timestep = 1000 / 60;