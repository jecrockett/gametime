# Faux-Gar: An Agar.io Inspired Game
### Built in JavaScript with a Node Server

![](http://g.recordit.co/rIWwfFOf8m.gif)

### Authors
[Joe Perry](http://github.com/jwperry), [Justin Pease](https://github.com/Jpease1020), [James Crockett](https://github.com/jecrockett)

This game was created in 10-days as a part of the curriculum for the [Turing School of Software & Design](http://turing.io) to complete the "Gametime" project.

### Overview
Faux-Gar is inspired by [Agar.io](http://agar.io). Players join the game and navigate around the game board consuming food. They can also consume green food for a brief speed boost, and red poisonous food that reduces size (though we suggest avoiding those). As players grow larger they also become slower, and their view of the game board zooms out. If two players collide and the difference between the player sizes is great enough, the larger player will consume the smaller player. The smaller player's game will restart and they will respawn elsewhere on the map. If the difference in mass between the two colliding players is not significant enough, neither player will consume the other. The goal of the game is to consume other players, top the leaderboard, and live forever in infamy.

### Live Version
You can find a live version of this application on Heroku at: [faux-gar.herokuapp.com](https://faux-gar.herokuapp.com)

### Setup
To set up a local copy of this project, perform the following:
  1. Clone the repository
  2. `cd` into the project's directory
  3. Run `npm install`
  4. Run `npm start` to fire up a development server
  5. Once the server is running, you can visit ```http://localhost:8181``` to run the application
  6. To build the static files: ```npm run build```
  7. To run tests in Node: ```npm test```

### Game Challenges
- Express Server and Websockets: This was the first time any of us have built a server in express or used websockets. Our game was initially limited to two-players on a local machine, but despite the short 10-day window we pushed to learn and implement express and websockets for online, multi-player capabilities.
- Canvas Scaling: This was also our first experience using a canvas. In order to implement the proportional scaling feature we wanted, allowing larger players to see more of the game board and smaller players only a portion, we had to implement a second full-size canvas to maintain the game state and translate the user's view onto the rendered canvas for each connected player.
- Virus Hunting: During testing we realized once a player was large enough they could easily dominate the game. We implemented a feature so that one of the viruses on the page "hunts" the largest player, ensuring more turnover and exciting gameplay.

### Dependencies
This project requires Node installed. [Click here to see Node download options](https://nodejs.org/en/download)
If you prefer homebrew, run: ```brew install node```
This application has many dependencies located in the ```package.json``` file. To install them, run: ```npm install```
