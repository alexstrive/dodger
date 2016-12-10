import {Entities} from "./entities";
import Sprite = Phaser.Sprite;
import Point = Phaser.Point;
import Game = Phaser.Game;
import IEntity = Entities.IEntity;
import {Directions} from "./enums";


interface IHero {

    sprite: Sprite;
    velocity: Point;
    scale: Point;
    isKilled: boolean;
    direction: Directions;

    update(): void;
    move(): void;
    changeDirection(direction: Directions): void;
    reverseSprite(): void;
    isOverlap(entity: IEntity): void;

}

export class Hero implements IHero {
    private _direction: Directions;
    private _sprite: Phaser.Sprite;
    private _velocity: Phaser.Point;
    private _scale: Phaser.Point;
    private _isKilled: boolean = false;

    constructor(game: Game) {
        let x = game.width / 2;
        let y = 525;

        this.velocity = new Point(0, 0);
        this.sprite = game.add.sprite(x, y, "hero");

        this.direction = Directions.Left;

        this.sprite.anchor.set(.5, .5);
        this.sprite.scale.set(.4, .4);
    }

    reverseSprite(): void {
        this.sprite.scale.multiply(-1, 1);
    }

    changeDirection(direction: Directions): void {
        if (direction != this.direction) {
            this.reverseSprite();
            this.direction = direction;
            this.velocity.multiply(-1, 1);
        }
    }

    isOverlap(entity: IEntity): void {
        if (this.sprite.overlap(entity.sprite)) {
            this.isKilled = true;
        }
    }

    update(): void {
        if (this.isKilled) {
            this.sprite.loadTexture("hero-died");
            this.isKilled = false;
        }
        else {
            this.sprite.loadTexture("hero");
        }

        this.move();
    }

    move(): void {

        this.sprite.position.add(this.velocity.x, this.velocity.y);
    }


    get direction(): Directions {
        return this._direction;
    }

    set direction(value: Directions) {
        this._direction = value;
    }

    get sprite(): Phaser.Sprite {
        return this._sprite;
    }

    get isKilled(): boolean {
        return this._isKilled;
    }

    get velocity(): Phaser.Point {
        return this._velocity;
    }

    get scale(): Phaser.Point {
        return this._scale;
    }

    set isKilled(value: boolean) {
        this._isKilled = value;
    }

    set velocity(value: Phaser.Point) {
        this._velocity = value;
    }

    set sprite(value: Phaser.Sprite) {
        this._sprite = value;
    }
}