import {Entities} from "./entities";
import Stone = Entities.Stone;

let entities: Array<Stone> = [];
let countNewEntities = 1;
let addK = .3;

const game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
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

    generateEntity();
    generateEntity();
}

function update() {

    for (let entity of entities) {
        entity.update();

        if (entity.sprite.position.y > game.height) {
            entity.sprite.kill();
            entities.splice(entities.indexOf(entity), 1);
            generateEntity();
        }
    }
}

function render() {
}

function generateEntity() {
    let entity: Stone = new Stone(game);
    for (let i = 0; i < Math.floor(countNewEntities); i++) {
        if (Math.floor(countNewEntities) < 2) {
            countNewEntities += addK;
        }
        if (entities.length < 5) {
            entities.push(entity);
        }
        console.log(countNewEntities);
    }
}