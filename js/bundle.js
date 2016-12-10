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
            this.velocity.y = utils_1.Utils.getRandomInt(3, 6);
            this.sprite = game.add.sprite(x, y, "s" + n);
            this.sprite.anchor.set(.5, .5);
            this.sprite.scale.set(.1, .1);
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
var enums_1 = require("./enums");
var entities = [];
var countNewEntities = 1;
var k = .25;
var score = 0;
var scoreText;
var bg;
var hero;
var keyLeft, keyRight;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});
function preload() {
    game.load.image("bg", "assets/bg.png");
    game.load.image('s1', 'assets/stone-1.png');
    game.load.image('s2', 'assets/stone-2.png');
    game.load.image('s3', 'assets/stone-3.png');
    game.load.image('s4', 'assets/stone-4.png');
    game.load.image('s5', 'assets/stone-5.png');
    game.load.image("hero", "assets/hero.png");
    game.load.image("hero-died", "assets/hero-died.png");
}
function create() {
    bg = game.add.sprite(0, 0, "bg");
    game.stage.backgroundColor = '#58B7FF';
    game.time.desiredFps = 60;
    scoreText = game.add.text(game.width - 150, 0, "Score: 0", {
        fill: "White"
    });
    hero = new hero_1.Hero(game);
    generateEntity();
    generateEntity();
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
            generateEntity();
            updateScore();
        }
    }
    if (keyRight.isDown) {
        hero.changeDirection(enums_1.Directions.Right);
        hero.velocity.set(3, 0);
    }
    else if (keyLeft.isDown) {
        hero.changeDirection(enums_1.Directions.Left);
        hero.velocity.set(-3, 0);
    }
    else {
        hero.velocity.set(0, 0);
    }
    hero.update();
}
function generateEntity() {
    var entity = new Stone(game);
    for (var i = 0; i < Math.floor(countNewEntities); i++) {
        if (Math.floor(countNewEntities) < 2) {
            countNewEntities += k;
        }
        if (entities.length < 7) {
            entities.push(entity);
        }
    }
}
function updateScore() {
    score++;
    scoreText.setText("Score: " + score);
}

},{"./entities":1,"./enums":2,"./hero":4}],4:[function(require,module,exports){
"use strict";
var Point = Phaser.Point;
var enums_1 = require("./enums");
var Hero = (function () {
    function Hero(game) {
        this._isKilled = false;
        var x = game.width / 2;
        var y = 525;
        this.velocity = new Point(0, 0);
        this.sprite = game.add.sprite(x, y, "hero");
        this.direction = enums_1.Directions.Left;
        this.sprite.anchor.set(.5, .5);
        this.sprite.scale.set(.4, .4);
    }
    Hero.prototype.reverseSprite = function () {
        this.sprite.scale.multiply(-1, 1);
    };
    Hero.prototype.changeDirection = function (direction) {
        if (direction != this.direction) {
            this.reverseSprite();
            this.direction = direction;
            this.velocity.multiply(-1, 1);
        }
    };
    Hero.prototype.isOverlap = function (entity) {
        if (this.sprite.overlap(entity.sprite)) {
            this.isKilled = true;
        }
    };
    Hero.prototype.update = function () {
        if (this.isKilled) {
            this.sprite.loadTexture("hero-died");
            this.isKilled = false;
        }
        else {
            this.sprite.loadTexture("hero");
        }
        this.move();
    };
    Hero.prototype.move = function () {
        this.sprite.position.add(this.velocity.x, this.velocity.y);
    };
    Object.defineProperty(Hero.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (value) {
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "isKilled", {
        get: function () {
            return this._isKilled;
        },
        set: function (value) {
            this._isKilled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    return Hero;
}());
exports.Hero = Hero;

},{"./enums":2}],5:[function(require,module,exports){
"use strict";
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
var Utils;
(function (Utils) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    Utils.getRandomInt = getRandomInt;
})(Utils = exports.Utils || (exports.Utils = {}));

},{}]},{},[3])