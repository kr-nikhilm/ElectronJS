const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('node:path')

const menu = Menu.buildFromTemplate([
    {
        label: app.name,
        submenu: [
            {
                label: 'About'
            }
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'New Window',
                click: async () => {
                    let urlWindow = new BrowserWindow({
                        height: 500,
                        width: 500
                    })

                    urlWindow.loadURL('https:github.com')
                }
            },
            {
                label: 'Open Camera',
                click: async () => {
                    let win2 = new BrowserWindow({
                        height: 500,
                        width: 500,
                        webPreferences: {
                            preload: path.join(__dirname, 'cameraPreload.js')
                        }
                    })

                    ipcMain.on('close-window-2', () => {
                        win2.destroy()
                    })

                    win2.loadFile('./camera.html')
                }
            },
            {
                label: 'Learn More',
                click: async () => await shell.openExternal('https://electronjs.org')
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click: () => app.quit()
            },
            {
                role: 'quit'
            }
        ]
    }
])

Menu.setApplicationMenu(menu)

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('set-image', (event, data) => {
        win.webContents.send('get-image', data)
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})