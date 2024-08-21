console.log('Hello from Electron 👋')

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 700,
      height: 700,
      //resizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    win.loadFile('index.html')
    //win.loadURL('https://github.com')

    //win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Also by listening event for node js
// app.on('ready', () => {
//     createWindow()
// })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})