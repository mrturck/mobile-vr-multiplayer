# mobile-vr-multiplayer

See live demo at https://pioneer-jbtvofwyqh.now.sh/

![Screenshot](https://github.com/mrturck/mobile-vr-multiplayer/public/screenshot.png)

## Interact with others in a multi-terrain VR world!

This is a small website created for a competition that lets users interact through the web browser in VR! 
- Users appear as astronauts
- A chat bar allows users to type
- A portal demonstrates how to teleport around the map

## Technical Notes
- The VR is created using Aframe VR framework and uses resources from existing projects to create the environment and the astronaut avatar.
- The server side is written in JS
- Multiplayer features such as chat and syncing position and rotation of players is accomplished using websockets

NOTE: If camera does not rotate automatically when rotating phone, you may need to go into settings to allow motio & Orientation access. On iPhone this can be accomplished by going to Settings -> Safari -> Motion & Orientation Access.

## How to run locally
Run `npm start` in your local machine and navigate to `localhost:3000`

