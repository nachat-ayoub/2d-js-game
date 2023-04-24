import Game from "./game";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  canvas.width = 1280;
  canvas.height = 720;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.render(context, deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});

// function resizeCanvas() {
//   const originalSize = {
//     width: 1280,
//     height: 720,
//   };

//   const currentSize = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   };

//     canvas.width = currentSize.width;
//     canvas.height =
//       (originalSize.height / originalSize.width) * currentSize.width;
// }
