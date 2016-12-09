import {Utils} from "./utils"

export module Entities {
    interface Entity {
        sprite: Phaser.Sprite;

        update(): void;
    }

    export class Stone implements Entity {
        private _sprite: Phaser.Sprite;
        private _velocity: Phaser.Point = new Phaser.Point(0, 0);
        private _x: number;
        private _y: number;

        constructor(game: Phaser.Game) {
            this._x = Utils.getRandomInt(0, game.width - 50);
            this._y = 1;
            this._velocity.y = Utils.getRandomInt(3, 6);

            let n = Utils.getRandomInt(1, 6);
            this._sprite = game.add.sprite(this._x, this._y, `s${n}`);
            this._sprite.scale.set(.1, .1);
        }

        update(): void {
            this._sprite.position.add(this._velocity.x, this._velocity.y);
        }

        get sprite(): Phaser.Sprite {
            return this._sprite;
        }


        set sprite(value: Phaser.Sprite) {
            this._sprite = value;
        }
    }
}