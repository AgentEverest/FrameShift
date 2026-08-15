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
const start = document.getElementById("start");

camera.style.display = "none";

start.onclick = async () => {
    landing.style.display = "none";

    await startCamera(camera);

    camera.style.display = "none"; // hide the raw video

    const canvas = document.getElementById("output");

    startRenderer(camera, canvas);

    await initializeHands();
};