(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var utils_1 = require("./utils");
var Point = Phaser.Point;
var Entities;
(function (Entities) {
    var Stone = (function () {
        function Stone(game) {
            this._velocity = new Point(0, 0);
            this._scale = new Point(0, 0);
            this._rotation = 0;
            var x = utils_1.Utils.getRandomInt(0, game.width - 50);
            var y = 1;
            var n = utils_1.Utils.getRandomInt(1, 6);
            this.rotation = Math.PI / utils_1.Utils.getRandomInt(30, 60);
            this.velocity.y = utils_1.Utils.getRandomInt(3, 5);
            this.sprite = game.add.sprite(x, y, "s" + n);
            this.sprite.anchor.set(.5, .5);
            this.sprite.scale.set(.08, .08);
        }
        Stone.prototype.update = function () {
            this.sprite.position.add(this.velocity.x, this.velocity.y);
            this.sprite.scale.add(this.scale.x, this.scale.y);
            this.sprite.rotation += this.rotation;
        };
        Object.defineProperty(Stone.prototype, "sprite", {
            get: function () {
                return this._sprite;
            },
            set: function (value) {
                this._sprite = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stone.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stone.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stone.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                this._rotation = value;
            },
            enumerable: true,
            configurable: true
        });
        return Stone;
    }());
    Entities.Stone = Stone;
})(Entities = exports.Entities || (exports.Entities = {}));

},{"./utils":5}],2:[function(require,module,exports){
"use strict";
var Directions;
(function (Directions) {
    Directions[Directions["Left"] = 0] = "Left";
    Directions[Directions["Right"] = 1] = "Right";
})(Directions = exports.Directions || (exports.Directions = {}));

},{}],3:[function(require,module,exports){
"use strict";
var entities_1 = require("./entities");
var hero_1 = require("./hero");
var Stone = entities_1.Entities.Stone;
var MAX_ENTITIES = 7;
var entities = [];
var score = 0;
var scoreText;
var background;
var hero;
// player input
var keyLeft, keyRight;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});
function preload() {
    game.load.image("background", "assets/bg.png");
    game.load.image('s1', 'assets/stone-1.png');
    game.load.image('s2', 'assets/stone-2.png');
    game.load.image('s3', 'assets/stone-3.png');
    game.load.image('s4', 'assets/stone-4.png');
    game.load.image('s5', 'assets/stone-5.png');
    game.load.image("hero", "assets/hero.png");
    game.load.image("hero-died", "assets/hero-died.png");
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setResizeCallback(function () {
        // game.scale.setupScale(window.innerWidth, window.innerHeight);
    }, this);
}
function create() {
    background = game.add.sprite(0, 0, "background");
    game.stage.backgroundColor = '#58B7FF';
    game.time.desiredFps = 60;
    scoreText = game.add.text(game.width - 150, 0, "Score: 0", {
        fill: "White"
    });
    hero = new hero_1.CrazyDodger(game);
    generateEntity(1);
    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}
function update() {
    for (var _i = 0, entities_2 = entities; _i < entities_2.length; _i++) {
        var entity = entities_2[_i];
        entity.update();
        hero.isOverlap(entity);
        if (entity.sprite.position.y > game.height) {
            entity.sprite.kill();
            entities.splice(entities.indexOf(entity), 1);
            generateEntity(2);
            updateScore();
        }
    }
    hero.handleInput(keyLeft, keyRight);
    hero.update();
}
function generateEntity(count) {
    if (entities.length < MAX_ENTITIES) {
        for (var i = 0; i < count; i++) {
            entities.push(new Stone(game));
        }
    }
}
function updateScore() {
    score++;
    scoreText.setText("Score: " + score);
}

},{"./entities":1,"./hero":4}],4:[function(require,module,exports){
"use strict";
var enums_1 = require("./enums");
var Point = Phaser.Point;
var CrazyDodger = (function () {
    function CrazyDodger(game) {
        this._isKilled = false;
        this._speed = 5;
        this._game = game;
        var x = this._game.width / 2;
        var y = this._game.height - 65;
        this.velocity = new Point(0, 0);
        this.sprite = this._game.add.sprite(x, y, "hero");
        this.direction = enums_1.Directions.Left;
        this.sprite.anchor.set(.5, .5);
        this.sprite.scale.set(.4, .4);
    }
    CrazyDodger.prototype.update = function () {
        this._sprite.position.y = this._game.height - 65;
        if (this.isKilled) {
            this.sprite.loadTexture("hero-died");
            this.isKilled = false;
        }
        else {
            this.sprite.loadTexture("hero");
        }
        this.move();
    };
    CrazyDodger.prototype.move = function () {
        var rightBorder = this._game.width - 40;
        var leftBorder = 40;
        if (this.sprite.position.x > rightBorder) {
            this.sprite.position.x = rightBorder;
        }
        if (this.sprite.position.x < leftBorder) {
            this.sprite.position.x = leftBorder;
        }
        this.sprite.position.add(this.velocity.x, this.velocity.y);
    };
    CrazyDodger.prototype.handleInput = function (keyLeft, keyRight) {
        if (keyRight.isDown) {
            this.changeDirection(enums_1.Directions.Right);
            this.velocity.set(this.speed, 0);
        }
        else if (keyLeft.isDown) {
            this.changeDirection(enums_1.Directions.Left);
            this.velocity.set(-this.speed, 0);
        }
        else {
            this.velocity.set(0, 0);
        }
    };
    CrazyDodger.prototype.reverseSprite = function () {
        this.sprite.scale.multiply(-1, 1);
    };
    CrazyDodger.prototype.changeDirection = function (direction) {
        if (direction != this.direction) {
            this.reverseSprite();
            this.direction = direction;
            this.velocity.multiply(-1, 1);
        }
    };
    CrazyDodger.prototype.isOverlap = function (entity) {
        if (this.sprite.overlap(entity.sprite)) {
            this.isKilled = true;
        }
    };
    Object.defineProperty(CrazyDodger.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrazyDodger.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrazyDodger.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (value) {
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrazyDodger.prototype, "isKilled", {
        get: function () {
            return this._isKilled;
        },
        set: function (value) {
            this._isKilled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrazyDodger.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrazyDodger.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    return CrazyDodger;
}());
exports.CrazyDodger = CrazyDodger;

},{"./enums":2}],5:[function(require,module,exports){
"use strict";
var Utils;
(function (Utils) {
    function getRandom() {
        return Math.random();
    }
    Utils.getRandom = getRandom;
    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    Utils.getRandomInt = getRandomInt;
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    Utils.getRandomArbitrary = getRandomArbitrary;
})(Utils = exports.Utils || (exports.Utils = {}));

},{}]},{},[3])