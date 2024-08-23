console.log("example")

const { app, BrowserWindow, clipboard, dialog }  = require('electron')

function createWindow() {
    let window = new BrowserWindow({
        width: 600,
        height: 500,
        backgroundColor: '#9e9c99'
    })

    //window.loadURL('https://google.com')
    window.loadFile('./index.html')

    window.setBackgroundColor('#ddffff')

    clipboard.writeText('hello')

    // Execute code in the main process
    window.webContents.executeJavaScript(
        console.log("hello world")
    )

    dialog.showMessageBox(window, {
        type: 'info',
        title: 'Dialog Box',
        message: 'Example dialog box',
        buttons: ['OK']
    })
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
