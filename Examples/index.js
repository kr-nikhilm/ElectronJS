console.log("example")

const { app, BrowserWindow, clipboard }  = require('electron')

function createWindow() {
    let window = new BrowserWindow({
        width: 600,
        height: 500,
        backgroundColor: '#9e9c99'
    })

    //window.loadURL('https://google.com')
    window.loadFile('./index.html')

    window.setBackgroundColor('#cccccc')

    clipboard.writeText('hello')
}

app.whenReady().then( () => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
