import Game from ".";
import { createSprite, randInt } from "./utils";
import { ISprite } from "./utils/types";

class ObjectBase {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  sprite: ISprite;

  constructor(game: Game) {
    this.game = game;
  }

  randomizeXY() {
    const margin = 20;
    this.x = randInt(margin, this.game.width - this.width - margin);
    this.y = randInt(
      this.game.topMargin + margin,
      this.game.height - this.height - margin
    );
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime?: number) {
    ctx.drawImage(
      this.sprite.image,
      this.sprite.frameX,
      this.sprite.frameY,
      this.sprite.width,
      this.sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (deltaTime) this.sprite.animate(deltaTime);
  }
  update() {}
}

export class Bush extends ObjectBase {
  constructor(game: Game, randomXY: boolean = false) {
    super(game);

    this.width = 216;
    this.height = 100;

    this.randomizeXY();

    this.sprite = createSprite({
      image: document.querySelector("img#bush"),
      width: this.width,
      height: this.height,
      fps: 0,
      maxFrames: 0,
    });
  }
}

export class Grass extends ObjectBase {
  constructor(game: Game, randomXY: boolean = false) {
    super(game);

    this.width = 103;
    this.height = 182;

    this.randomizeXY();

    this.sprite = createSprite({
      image: document.querySelector("img#grass"),
      width: this.width,
      height: this.height,
      fps: 0,
      maxFrames: 0,
    });
  }
}

export class Plant extends ObjectBase {
  constructor(game: Game, randomXY: boolean = false) {
    super(game);

    this.width = 212;
    this.height = 118;

    this.randomizeXY();

    this.sprite = createSprite({
      image: document.querySelector("img#plant"),
      width: this.width,
      height: this.height,
      fps: 0,
      maxFrames: 0,
    });
  }
}
