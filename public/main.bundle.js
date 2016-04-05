/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FoodGenerator = __webpack_require__(1);
	var ShapeDrawer = __webpack_require__(4);
	var Player = __webpack_require__(5);
	var KeyTracker = __webpack_require__(6);

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var shapeDrawer = new ShapeDrawer(canvas, ctx);
	var keyTracker = new KeyTracker(canvas);
	var foodGen = new FoodGenerator(canvas, ctx);

	var players = [];
	players.push(new Player('Player 1', 200, 50, 8, keyTracker));
	players.push(new Player('Player 2', 250, 50, 8, keyTracker));

	var food = foodGen.seedFood();
	var boosts = foodGen.seedSpeedBoosts();

	requestAnimationFrame(function gameLoop() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  for (var i = 0; i < food.length; i++) {
	    shapeDrawer.drawFood(food[i]);
	  }

	  for (var j = 0; j < players.length; j++) {
	    players[j].resetSpeedBoost();
	    shapeDrawer.drawPlayer(players[j]).move();
	    players[j].eatFood.call(players[j], food);
	    players[j].eatBoosts.call(players[j], boosts);
	    players[j].eatPlayer.call(players[j], players);
	  }

	  for (var k = 0; k < boosts.length; k++) {
	    shapeDrawer.drawFood(boosts[k]);
	  }

	  foodGen.replaceFood(food, boosts);

	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Food = __webpack_require__(2);
	var SpeedBoost = __webpack_require__(3);

	function FoodGenerator(width, height) {
	  this.canvasWidth = width;
	  this.canvasHeight = height;
	}

	FoodGenerator.prototype = {
	  seedFood: function seedFood(players) {
	    var food = [];
	    for (var i = 0; i < 250; i++) {
	      var foodItem = new Food(this.randOnCanvas(players));
	      food.push(foodItem);
	    }
	    return food;
	  },

	  seedSpeedBoosts: function seedSpeedBoosts(players) {
	    var speedBoosts = [];
	    for (var i = 0; i < 15; i++) {
	      var boost = new SpeedBoost(this.randOnCanvas(players));
	      speedBoosts.push(boost);
	    }
	    return speedBoosts;
	  },

	  randOnCanvas: function randOnCanvas(players) {
	    var newCoords = { x: Math.floor(Math.random() * (this.canvasWidth - 10) + 5),
	      y: Math.floor(Math.random() * (this.canvasHeight - 10) + 5) };
	    var isNotInsidePlayer = false;
	    var canWidth = this.canvasWidth;
	    var canHeight = this.canvasHeight;

	    function checkPlayer(player, i, players) {
	      var xDiff = newCoords.x - player.x;
	      var yDiff = newCoords.y - player.y;
	      var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	      return distance > player.mass + 15;
	    }

	    while (isNotInsidePlayer === false) {
	      isNotInsidePlayer = players.every(checkPlayer);
	      if (isNotInsidePlayer === false) {
	        newCoords = { x: Math.floor(Math.random() * (canWidth - 10) + 5),
	          y: Math.floor(Math.random() * (canHeight - 10) + 5) };
	      }
	    }
	    return newCoords;
	  },

	  replaceFood: function replaceFood(allFood, speedBoosts, players) {
	    while (allFood.length < 250) {
	      var foodItem = new Food(this.randOnCanvas(players));
	      allFood.push(foodItem);
	    }
	    while (speedBoosts.length < 15) {
	      speedBoosts.push(new SpeedBoost(this.randOnCanvas(players)));
	    }
	  }
	};

	module.exports = FoodGenerator;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function Food(coords) {
	  this.x = coords.x;
	  this.y = coords.y;
	  this.color = 'black';
	}

	module.exports = Food;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function SpeedBoost(coords) {
	  this.x = coords.x;
	  this.y = coords.y;
	  this.color = '#42c32e';
	}

	module.exports = SpeedBoost;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function ShapeDrawer(canvas, context) {
	  this.canvas = canvas;
	  this.context = context;
	}

	ShapeDrawer.prototype = {
	  drawFood: function drawFood(food) {
	    console.log(food);
	    this.context.beginPath();
	    this.context.arc(food.x, food.y, 5, 0, Math.PI * 2);
	    this.context.fillStyle = food.color;
	    this.context.fill();
	    return this;
	  },

	  drawPlayer: function drawPlayer(player) {
	    this.context.beginPath();
	    this.context.arc(player.x, player.y, player.mass, 0, Math.PI * 2);
	    this.context.fillStyle = 'royalblue';
	    this.context.fill();
	    return player;
	  }
	};

	module.exports = ShapeDrawer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function Player(name, x, y, keyTracker) {
	  this.name = name;
	  this.x = x;
	  this.y = y;
	  this.mass = 5;
	  this.speed = 5;
	  this.keyTracker = keyTracker;
	  this.speedBoostTime = null;
	  this.movePlayer = function (xOffset, yOffset) {
	    if (this.speedBoostTime !== null) {
	      this.x += xOffset * (this.speed * 2);
	      this.y += yOffset * (this.speed * 2);
	    } else {
	      this.x += xOffset * this.speed;
	      this.y += yOffset * this.speed;
	    }
	  };

	  this.moveLeft = this.movePlayer.bind(this, -1, 0);
	  this.moveRight = this.movePlayer.bind(this, 1, 0);
	  this.moveUp = this.movePlayer.bind(this, 0, -1);
	  this.moveDown = this.movePlayer.bind(this, 0, 1);
	}

	Player.prototype = {
	  move: function move() {
	    this.movePlayer1(this.speed);
	    this.movePlayer2(this.speed);
	    return this;
	  },

	  eatFood: function eatFood(food) {
	    for (var i = 0; i < food.length; i++) {
	      var xDiff = this.x - food[i].x;
	      var yDiff = this.y - food[i].y;
	      var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	      if (distance < this.mass) {
	        food.splice(i, 1);
	        this.mass += 1;
	        if (this.speed > 1.0) {
	          this.speed -= 0.003;
	        }
	      }
	    }
	  },

	  eatBoosts: function eatBoosts(boosts) {
	    for (var i = 0; i < boosts.length; i++) {
	      var xDiff = this.x - boosts[i].x;
	      var yDiff = this.y - boosts[i].y;
	      var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	      if (distance < this.mass) {
	        boosts.splice(i, 1);
	        this.speedBoostTime = Date.now();
	      }
	    }
	  },

	  eatPlayer: function eatPlayer(players) {
	    for (var i = 0; i < players.length; i++) {
	      var xDiff = this.x - players[i].x;
	      var yDiff = this.y - players[i].y;
	      var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	      if (distance < this.mass * 0.8 && players[i] !== this && this.mass * 0.8 > players[i].mass) {
	        this.mass = this.mass + players[i].mass;
	        players.splice(i, 1);
	      }
	    }
	  },

	  resetSpeedBoost: function resetSpeedBoost() {
	    if (this.speedBoostTime < Date.now() - 1200) {
	      this.speedBoostTime = null;
	    }
	  },

	  movePlayer1: function movePlayer1() {
	    if (this.isPlayer1()) {
	      if (this.attemptsValidMoveLeft('P1LEFT')) {
	        this.moveLeft();
	      }
	      if (this.attemptsValidMoveRight('P1RIGHT')) {
	        this.moveRight();
	      }
	      if (this.attemptsValidMoveUp('P1UP')) {
	        this.moveUp();
	      }
	      if (this.attemptsValidMoveDown('P1DOWN')) {
	        this.moveDown();
	      }
	    }
	  },

	  movePlayer2: function movePlayer2() {
	    if (this.isPlayer2()) {
	      if (this.attemptsValidMoveLeft('P2LEFT')) {
	        this.moveLeft();
	      }
	      if (this.attemptsValidMoveRight('P2RIGHT')) {
	        this.moveRight();
	      }
	      if (this.attemptsValidMoveUp('P2UP')) {
	        this.moveUp();
	      }
	      if (this.attemptsValidMoveDown('P2DOWN')) {
	        this.moveDown();
	      }
	    }
	  },

	  isPlayer1: function isPlayer1() {
	    return this.name === 'Player 1';
	  },

	  isPlayer2: function isPlayer2() {
	    return this.name === 'Player 2';
	  },

	  attemptsValidMoveLeft: function attemptsValidMoveLeft(key) {
	    return this.keyTracker.isPressed(this.keyTracker.keys[key]) && this.keyTracker.canMoveLeft(this);
	  },

	  attemptsValidMoveRight: function attemptsValidMoveRight(key) {
	    return this.keyTracker.isPressed(this.keyTracker.keys[key]) && this.keyTracker.canMoveRight(this);
	  },

	  attemptsValidMoveUp: function attemptsValidMoveUp(key) {
	    return this.keyTracker.isPressed(this.keyTracker.keys[key]) && this.keyTracker.canMoveUp(this);
	  },

	  attemptsValidMoveDown: function attemptsValidMoveDown(key) {
	    return this.keyTracker.isPressed(this.keyTracker.keys[key]) && this.keyTracker.canMoveDown(this);
	  }
	};

	module.exports = Player;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var KeyTracker = function KeyTracker(canvas) {
	  this.canvas = canvas;
	  this.keyPressed = {};
	  this.keys = {
	    P1UP: 87, //w
	    P1LEFT: 65, //a
	    P1DOWN: 83, //s
	    P1RIGHT: 68, //d
	    P2UP: 80, //p
	    P2LEFT: 76, //l
	    P2DOWN: 186, //;
	    P2RIGHT: 222 //'
	  };

	  window.onkeydown = (function (event) {
	    this.keyPressed[event.keyCode] = true;
	  }).bind(this);

	  window.onkeyup = (function (event) {
	    this.keyPressed[event.keyCode] = false;
	  }).bind(this);
	};

	KeyTracker.prototype = {

	  isPressed: function isPressed(keyCode) {
	    return this.keyPressed[keyCode];
	  },

	  canMoveLeft: function canMoveLeft(player) {
	    return player.x - player.mass > 0;
	  },

	  canMoveRight: function canMoveRight(player) {
	    return player.x + player.mass < this.canvas.width;
	  },

	  canMoveUp: function canMoveUp(player) {
	    return player.y - player.mass > 0;
	  },

	  canMoveDown: function canMoveDown(player) {
	    return player.y + player.mass < this.canvas.height;
	  }
	};

	module.exports = KeyTracker;

/***/ }
/******/ ]);