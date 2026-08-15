import { startRenderer } from "./renderer/render.js";
import { initializeHands } from "./vision/hands.js";
import "./style.css";
import { startCamera } from "./camera/camera.js";

document.querySelector("#app").innerHTML = `
<div id="landing" class="landing">
    <h1>FrameShift</h1>

    <p>Peek into another universe.</p>

    <button id="start">
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

<canvas id="output"></canvas>
`;

const landing = document.getElementById("landing");
const camera = document.getElementById("camera");
const canvas = document.getElementById("output");
const start = document.getElementById("start");

camera.style.display = "none";
canvas.style.display = "none";

start.onclick = async () => {
    console.log("BUTTON CLICKED");    landing.style.display = "none";

    canvas.style.display = "block";

    await startCamera(camera);

    camera.style.display = "none";

    await initializeHands();

startRenderer(camera, canvas);
};