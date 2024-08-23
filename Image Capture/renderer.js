const imgTag = document.getElementById('image')

window.electronAPI.getImage((event, data) => {
    imgTag.src = data
    window.electronAPI.closeWindow2()

    new Notification("Image Captured", { 
        body: "Image is successfully captured.",
    })
})