(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var utils_1 = require("./utils");
var Entities;
(function (Entities) {
    var Stone = (function () {
        function Stone(game) {
            this._velocity = new Phaser.Point(0, 0);
            this._x = utils_1.Utils.getRandomInt(0, game.width - 50);
            this._y = 1;
            this._velocity.y = utils_1.Utils.getRandomInt(3, 6);
            var n = utils_1.Utils.getRandomInt(1, 6);
            this._sprite = game.add.sprite(this._x, this._y, "s" + n);
            this._sprite.scale.set(.1, .1);
        }
        Stone.prototype.update = function () {
            this._sprite.position.add(this._velocity.x, this._velocity.y);
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
        return Stone;
    }());
    Entities.Stone = Stone;
})(Entities = exports.Entities || (exports.Entities = {}));

},{"./utils":3}],2:[function(require,module,exports){
"use strict";
var entities_1 = require("./entities");
var Stone = entities_1.Entities.Stone;
var entities = [];
var countNewEntities = 1;
var addK = .3;
var score = 0;
var scoreText;
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
}
function create() {
    game.add.sprite(0, 50, "bg");
    game.stage.backgroundColor = '#58B7FF';
    game.time.desiredFps = 300;
    scoreText = game.add.text(game.width - 150, 0, "Score: 0", {
        fill: "White"
    });
    generateEntity();
    generateEntity();
}
function update() {
    for (var _i = 0, entities_2 = entities; _i < entities_2.length; _i++) {
        var entity = entities_2[_i];
        entity.update();
        if (entity.sprite.position.y > game.height) {
            entity.sprite.kill();
            entities.splice(entities.indexOf(entity), 1);
            generateEntity();
            updateScore();
        }
    }
}
function generateEntity() {
    var entity = new Stone(game);
    for (var i = 0; i < Math.floor(countNewEntities); i++) {
        if (Math.floor(countNewEntities) < 2) {
            countNewEntities += addK;
        }
        if (entities.length < 5) {
            entities.push(entity);
        }
    }
}
function updateScore() {
    score++;
    scoreText.setText("Score: " + score);
}

},{"./entities":1}],3:[function(require,module,exports){
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

},{}]},{},[2])