import {Entities} from "./entities";
import {Directions} from "./enums";

import Sprite = Phaser.Sprite;
import Point = Phaser.Point;
import Game = Phaser.Game;
import IEntity = Entities.IEntity;
import Key = Phaser.Key;

interface IHero {
    speed: number;
    isKilled: boolean;
    sprite: Sprite;
    velocity: Point;
    scale: Point;
    direction: Directions;

    update(): void;
    move(): void;
    changeDirection(direction: Directions): void;
    reverseSprite(): void;
    isOverlap(entity: IEntity): void;
    handleInput(keyLeft: Key, keyRight: Key): void;
}

export class CrazyDodger implements IHero {
    private _speed: number;
    private _direction: Directions;
    private _sprite: Phaser.Sprite;
    private _velocity: Phaser.Point;
    private _scale: Phaser.Point;
    private _isKilled: boolean = false;
    private _game: Game;

    constructor(game: Game) {
        this._speed = 5;
        this._game = game;

        let x = this._game.width / 2;
        let y = this._game.height - 65;

        this.velocity = new Point(0, 0);

        this.sprite = this._game.add.sprite(x, y, "hero");

        this.direction = Directions.Left;
        this.sprite.anchor.set(.5, .5);
        this.sprite.scale.set(.4, .4);
    }

    update(): void {

        this._sprite.position.y = this._game.height - 65;

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
        let rightBorder: number = this._game.width - 40;
        let leftBorder: number = 40;

        if (this.sprite.position.x > rightBorder){
            this.sprite.position.x = rightBorder;
        }

        if (this.sprite.position.x < leftBorder) {
            this.sprite.position.x = leftBorder;
        }

        this.sprite.position.add(this.velocity.x, this.velocity.y);
    }

    handleInput(keyLeft: Key, keyRight: Key): void {
        if (keyRight.isDown) {
            this.changeDirection(Directions.Right);
            this.velocity.set(this.speed, 0);
        }
        else if (keyLeft.isDown) {
            this.changeDirection(Directions.Left);
            this.velocity.set(-this.speed, 0);
        }
        else {
            this.velocity.set(0, 0);
        }
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

    get speed(): number {
        return this._speed;
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