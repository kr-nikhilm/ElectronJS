const video = document.getElementById("camera")
const captureButton = document.getElementById("capture")
const imageTag = document.getElementById("image")

captureButton.addEventListener('click', () => {
    const canvas = document.createElement("canvas");

    canvas.width = video.width;
    canvas.height = video.height;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL();

    imageTag.src = dataURL

    window.electronAPI.setImage(dataURL)
})

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
})