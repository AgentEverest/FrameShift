import { detectHands } from "../vision/hands.js";
import { getPortalPoints } from "../portal/portal.js";
import { updatePortal } from "../portal/portalState.js";

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17]
];

export function startRenderer(video, canvas) {
  const ctx = canvas.getContext("2d");

  function render() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw mirrored camera
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    const results = detectHands(video);
    const portal = getPortalPoints(results);
    const strength = updatePortal(portal !== null);

    // ===== Portal =====
    if (portal) {

    ctx.beginPath();

    ctx.moveTo(
        canvas.width - portal.leftIndex.x * canvas.width,
        portal.leftIndex.y * canvas.height
    );

    ctx.lineTo(
        canvas.width - portal.rightIndex.x * canvas.width,
        portal.rightIndex.y * canvas.height
    );

    ctx.lineTo(
        canvas.width - portal.rightThumb.x * canvas.width,
        portal.rightThumb.y * canvas.height
    );

    ctx.lineTo(
        canvas.width - portal.leftThumb.x * canvas.width,
        portal.leftThumb.y * canvas.height
    );

    ctx.closePath();

    const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradient.addColorStop(0, "rgba(255,120,0,0.15)");
    gradient.addColorStop(0.5, "rgba(255,180,0,0.35)");
    gradient.addColorStop(1, "rgba(255,120,0,0.15)");

    ctx.globalAlpha = strength;

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.shadowBlur = 35 * strength;
    ctx.shadowColor = "#ff8c00";

    ctx.strokeStyle = "#ff8c00";
    ctx.lineWidth = 3 + strength * 3;

    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

    // ===== Hand Skeleton =====
    if (results && results.landmarks) {

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

        ctx.fillStyle = "#ffffff";

        for (const point of hand) {

          ctx.beginPath();

          ctx.arc(
            canvas.width - point.x * canvas.width,
            point.y * canvas.height,
            3,
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