export async function startCamera(videoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user"
    },
    audio: false,
  });

  videoElement.srcObject = stream;
  await videoElement.play();
}