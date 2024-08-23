const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setImage: (image) => ipcRenderer.send('set-image', image)
})