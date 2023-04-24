import { GAME_CONTROLS, createSprite } from "./utils";
import { ISprite } from "./utils/types";
import Game from ".";

export default class Player {
  width: number;
  height: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  game: Game;
  maxSpeed: number = 2.5;
  sprite: ISprite;

  constructor(game: Game) {
    this.width = 200;
    this.height = 200;
    this.x = 400;
    this.y = 0;

    this.speedX = 0;
    this.speedY = 0;
    this.game = game;
    this.sprite = createSprite({
      width: this.width,
      height: this.height,
      image: document.querySelector("#player"),
      maxFrames: 30,
      fps: 70,
    });
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime?: number) {
    // * Draw the player :
    ctx.drawImage(
      this.sprite.image,
      this.sprite.frameX * this.width,
      this.sprite.frameY * this.height,
      this.sprite.width,
      this.sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (deltaTime) this.sprite.animate(deltaTime);
  }

  update() {
    // * Update the player :
    this.move();
    this.x += this.speedX;
    this.y += this.speedY * 0.7;
  }

  checkMove(move: string = this.game.lastKey): {
    pressed: boolean;
    name: string;
  } {
    return {
      pressed: move.startsWith("P_"),
      name: move.split("_")[1],
    };
  }

  move() {
    let move =
      this.game.inputHandler.presedKeys.length > 0
        ? this.checkMove(this.game.inputHandler.presedKeys[0])
        : null;

    // * Move :
    if (move) {
      // * Right Left :
      if (move.name === GAME_CONTROLS.ARROW_RIGHT) {
        this.speedX = this.maxSpeed;
        this.speedY = 0;
        this.sprite.frameY = 5;
      } else if (move.name === GAME_CONTROLS.ARROW_LEFT) {
        this.speedX = -this.maxSpeed;
        this.sprite.frameY = 3;
        this.speedY = 0;
      }

      // * Up Down :
      if (move.name === GAME_CONTROLS.ARROW_DOWN) {
        this.speedY = this.maxSpeed;
        this.sprite.frameY = 1;
        this.speedX = 0;
      } else if (move.name === GAME_CONTROLS.ARROW_UP) {
        this.speedY = -this.maxSpeed;
        this.sprite.frameY = 7;
        this.speedX = 0;
      }
    } else {
      // * Handle Animations in when user stops moving:
      this.speedX = 0;
      this.speedY = 0;
      const lastMove = this.checkMove();

      if (lastMove.name === GAME_CONTROLS.ARROW_RIGHT) {
        this.sprite.frameY = 4;
      } else if (lastMove.name === GAME_CONTROLS.ARROW_LEFT) {
        this.sprite.frameY = 2;
      } else if (lastMove.name === GAME_CONTROLS.ARROW_DOWN) {
        this.sprite.frameY = 0;
      } else if (lastMove.name === GAME_CONTROLS.ARROW_UP) {
        this.sprite.frameY = 6;
      }
    }

    // * check boundaries
    const topWall = this.game.topMargin; // ? margin to make game realistic
    const bottomWall = this.game.height - this.height;
    const leftWall = 0;
    const rightWall = this.game.width - this.width;

    if (this.x < leftWall) this.x = leftWall;
    else if (this.x > rightWall) this.x = rightWall;
    if (this.y <= topWall) this.y = topWall;
    else if (this.y > bottomWall) this.y = bottomWall;
  }
}
