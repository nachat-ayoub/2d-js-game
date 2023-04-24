import { ISprite } from "./types";

export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const GAME_CONTROLS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
};

export function createSprite(
  sprite: Omit<
    ISprite,
    "animate" | "frameX" | "frameY" | "frameInterval" | "frameTimer"
  >
): ISprite {
  return {
    ...sprite,
    frameX: 0,
    frameY: 0,
    frameInterval: 1000 / sprite.fps,
    frameTimer: 0,
    animate(deltaTime: number) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrames) {
          this.frameX++;
        } else this.frameX = 0;

        this.frameTimer = 0;
      } else this.frameTimer += deltaTime;
    },
  };
}
