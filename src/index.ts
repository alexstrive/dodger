import {Entities} from "./entities";
import {Hero} from "./hero";
import Stone = Entities.Stone;
import KeyCode = Phaser.KeyCode;
import Key = Phaser.Key;
import {Directions} from "./enums";

let entities: Array<Stone> = [];
let countNewEntities: number = 1;
let k: number = .25;
let score: number = 0;
let scoreText: Phaser.Text;
let bg: Phaser.Sprite;
let hero: Hero;
let keyLeft: Key, keyRight: Key;

let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
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

    hero = new Hero(game);

    generateEntity();
    generateEntity();

    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function update() {

    for (let entity of entities) {
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
        hero.changeDirection(Directions.Right);
        hero.velocity.set(4, 0);
    }
    else if (keyLeft.isDown) {
        hero.changeDirection(Directions.Left);
        hero.velocity.set(-4, 0);
    }
    else {
        hero.velocity.set(0, 0);
    }

    hero.update();
}

function generateEntity() {
    let entity: Stone = new Stone(game);
    for (let i = 0; i < Math.floor(countNewEntities); i++) {
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
    scoreText.setText(`Score: ${score}`);
}