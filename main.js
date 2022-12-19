const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require("url");

let win

function createWindow() {
  const isDev = process?.env?.ENV === 'dev';
  // Create the browser window.
  win = new BrowserWindow({
    width: isDev ? 1600 : 780,
    height: isDev ? 1000 : 900,
    minWidth: 490,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
      // webSecurity: !process.env.DISABLE_CORS,
    },
    // icon: path.join(__dirname, 'build/icons/icon.png')
  })

  console.log('isDev', process?.env?.ENV)
  if (isDev) {
    win.loadURL('http://localhost:4200/')
  } else {
    win.loadURL(getBundleUrl());
  }
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit();
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function getBundleUrl() {
  return url.format({
    pathname: path.join(
      __dirname,
      './build/index.html'),
    protocol: 'file:',
    slashes: true
  })
}
