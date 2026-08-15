const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17]
];
import { detectHands } from "../vision/hands.js";

export function startRenderer(video, canvas) {
  const ctx = canvas.getContext("2d");

  function render() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

ctx.scale(-1, 1);

ctx.drawImage(
    video,
    -canvas.width,
    0,
    canvas.width,
    canvas.height
);

ctx.restore();

    const results = detectHands(video);

    if (results && results.landmarks) {
      ctx.fillStyle = "#f802be";
      for (const hand of results.landmarks) {
        ctx.strokeStyle = "#ff6b00";
ctx.lineWidth = 3;

for (const [a, b] of CONNECTIONS) {
  const p1 = hand[a];
  const p2 = hand[b];

  ctx.beginPath();
  ctx.moveTo(
    canvas.width - p1.x * canvas.width,
    p1.y * canvas.height
  );
  ctx.lineTo(
    canvas.width - p2.x * canvas.width,
    p2.y * canvas.height
  );
  ctx.stroke();
}
        for (const point of hand) {
          ctx.beginPath();

          ctx.arc(
            canvas.width - point.x * canvas.width,
            point.y * canvas.height,
            4,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}