import {Entities} from "./entities";
import {CrazyDodger} from "./hero";

import Stone = Entities.Stone;
import KeyCode = Phaser.KeyCode;
import Key = Phaser.Key;
import IEntity = Entities.IEntity;

const MAX_ENTITIES = 7;

let entities: Array<Stone> = [];
let score: number = 0;
let scoreText: Phaser.Text;
let background: Phaser.Sprite;
let hero: CrazyDodger;
// player input
let keyLeft: Key, keyRight: Key;

let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
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

    game.scale.setResizeCallback(() => {
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

    hero = new CrazyDodger(game);

    generateEntity(1);

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
            generateEntity(2);
            updateScore();
        }
    }

    hero.handleInput(keyLeft, keyRight);
    hero.update();
}

function generateEntity(count: number) {
    if (entities.length < MAX_ENTITIES) {
        for (let i = 0; i < count; i++) {
            entities.push(new Stone(game));
        }
    }
}

function updateScore() {
    score++;
    scoreText.setText(`Score: ${score}`);
}