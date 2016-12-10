import {Utils} from "./utils"

import Point = Phaser.Point;
import Game = Phaser.Game;
import Sprite = Phaser.Sprite;

export module Entities {

    export interface IEntity {
        sprite: Sprite;
        velocity: Point;
        scale: Point;
        rotation: number;

        update(): void;
    }

    export class Stone implements IEntity {

        private _sprite: Sprite;
        private _velocity: Point = new Point(0, 0);
        private _scale: Point = new Point(0, 0);
        private _rotation: number = 0;

        constructor(game: Game) {

            let x = Utils.getRandomInt(0, game.width - 50);
            let y = 1;
            let n = Utils.getRandomInt(1, 6);

            this.rotation = Math.PI / Utils.getRandomInt(30, 60);

            this.velocity.y = Utils.getRandomInt(3, 6);
            this.sprite = game.add.sprite(x, y, `s${n}`);
            this.sprite.anchor.set(.5, .5);
            this.sprite.scale.set(.1, .1)
        }

        update(): void {

            this.sprite.position.add(this.velocity.x, this.velocity.y);
            this.sprite.scale.add(this.scale.x, this.scale.y);
            this.sprite.rotation += this.rotation;

        }


        get sprite(): Sprite {
            return this._sprite;
        }

        get velocity(): Phaser.Point {
            return this._velocity;
        }

        get scale(): Phaser.Point {
            return this._scale;
        }

        get rotation(): number {
            return this._rotation;
        }

        set sprite(value: Sprite) {
            this._sprite = value;
        }

        set rotation(value: number) {
            this._rotation = value;
        }
    }
}