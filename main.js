const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

const remote = require('@electron/remote/main')
remote.initialize()

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      // nodeIntegration true 可以使用nodejs api
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      // 如果想在渲染器中使用nodejs， 上面三个写成true， 下面一个写成false
      contextIsolation: false,
      enableRemoteModule: true,  // 使用remote模块
      webviewTag: true
    }
  })

  const urlLocation = isDev ? 'http://localhost:3000' : ''
  mainWindow.loadURL(urlLocation)

  // 允许窗口的 webcontents 访问
  remote.enable(mainWindow.webContents)

  mainWindow.webContents.openDevTools({mode:'bottom'})
})