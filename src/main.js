import "./style.css";
import { startCamera } from "./camera/camera";

document.querySelector("#app").innerHTML = `
  <div class="landing" id="landing">
      <h1>FrameShift</h1>
      <p>Peek into another universe.</p>

      <button id="start-btn">
        Start Experience
      </button>
  </div>

  <video
      id="camera"
      autoplay
      playsinline
      muted
      style="display:none;"
  ></video>
`;

const startBtn = document.getElementById("start-btn");
const landing = document.getElementById("landing");
const video = document.getElementById("camera");

startBtn.addEventListener("click", async () => {
  landing.style.display = "none";

  video.style.display = "block";
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.objectFit = "cover";

  await startCamera(video);
});