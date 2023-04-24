import InputHandler from "./InputHandler";
import { Bush, Grass, Plant } from "./Objects";
import Player from "./Player";
import { randInt } from "./utils";

export default class Game {
  width: number;
  height: number;
  topMargin = 150;
  lastKey: string = "";
  inputHandler: InputHandler;
  player: Player;
  maxObjects = 10;
  objects: any[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.inputHandler = new InputHandler(this);
    this.player = new Player(this);

    this.objects.push(this.player);
    for (let i = 0; i < this.maxObjects; i++) {
      switch (randInt(1, 3)) {
        case 1:
          this.objects.push(new Bush(this, true));
          break;
        case 2:
          this.objects.push(new Plant(this, true));
          break;
        case 3:
          this.objects.push(new Grass(this, true));
          break;

        default:
          break;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, deltaTime: number) {
    ctx.clearRect(0, 0, this.width, this.height);

    // this.player.draw(ctx, deltaTime);

    this.objects
      .sort((a, b) => a.y + a.height - (b.y + b.height))
      .map((obj) => {
        obj.draw(ctx, deltaTime);
        obj.update();
      });
  }
}
