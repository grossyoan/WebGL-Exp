# Major Tom

A WebGL Space Experience made in something like 3 days. Had a hard time discovering THREE.JS, and how magical it was be ! I spent most of my time on this project trying to get working collisions. Raycasting wasn't that bad, but I didn't manage to get a precise trigger algorithm. I finally decided to switch to PhysiJS, resulting in these almost not-bugged-at-all-if-you-close-your-eyes-collisions.

## Features

- FPS like camera movement
- Usain Bolt Mode !
- Animated lights
- Imported GLTF 3D Objects
- PhysiJS physics and collision engine
- Background and walking sounds

## Requirements

- Node.js

## Installation guide

- Clone the repository
- Type npm i to download the dependencies
- Type npm run dev to run the game on a Node server
- Type npm run build to compile the game

!IMPORTANT : If you want to try the collision system, do a npm run build, there's an issue with the run dev.


## TO DO

- [x] Main menu
- [x] Sounds
- [x] Dynamic global lighting
- [x] Clean the code
- [ ] Optimize 3D models
- [ ] Interaction
- [ ] Controls panel
- [ ] Michael Bay Explosion and staging



## Known issues

- My webpack is, I think, completly broken, resulting, for example, in hitboxes that don't work in npm run dev
- Hitboxes are archaic and could be improved
- Alt tab or pausing the game may result in a teleportation, thanks to PointerLockControls.js. The lib sample has the same bug

