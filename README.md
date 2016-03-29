# Agar Clone

## Built in JavaScript

### Authors
[Joe Perry](http://github.com/jwperry), [Justin Pease](https://github.com/Jpease1020), [James Crockett](https://github.com/jecrockett)

This project was created as a part of the curriculum for the [Turing School of Software & Design](http://turing.io) to complete the "Gametime" project.

### Overview
This is a clone of the [Agar.io](http://agar.io) game. It is written in JavaScript. A player can join the game and navigate around the game board. They can consume 'food' circles to grow larger. As they grow larger, they also become slower and their view of the game board zooms out. If two players collide and the difference between the player sizes is great enough, the larger player will consume the smaller player as if they were food. If the difference in mass between the two colliding players is not significant enough, neither player will consume the other. The goal of the game is to consume other players and top the leaderboard for points.

### Live Version
You can find a live version of this application on Heroku at: [insert production site](https://upload.wikimedia.org/wikipedia/commons/1/1a/Cat_crying_(Lolcat).jpg)

### Setup
To set up a local copy of this project, perform the following:
  1. Clone the repository
  2. `cd` into the project's directory
  3. Run `npm install`
  4. Run `npm start` to fire up a development server
  5. Once the server is running, you can visit:
    - ```http://localhost:8080/webpack-dev-server/``` to run the application
    - ```http://localhost:8080/webpack-dev-server/test.html``` to run the test suite in the browser.
  6. To build the static files: ```npm run build```
  7. To run tests in Node: ```npm test```

### Dependencies
This project requires Node installed. [Click here to see Node download options](https://nodejs.org/en/download)
If you prefer homebrew, run: ```brew install node```
This application has many dependencies located in the ```package.json``` file. To install them, run: ```npm install```
