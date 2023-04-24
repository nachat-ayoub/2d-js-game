import Game from ".";

export default class InputHandler {
  game: Game;
  presedKeys: string[] = [];

  constructor(game: Game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      const key = "P_" + e.key;
      this.game.lastKey = key;
      if (!this.presedKeys.includes(key)) {
        this.presedKeys = [key, ...this.presedKeys];
      }
    });
    window.addEventListener("keyup", (e) => {
      this.game.lastKey = "R_" + e.key;
      this.presedKeys = this.presedKeys.filter((key) => key !== "P_" + e.key);
    });
  }
}
