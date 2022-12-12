const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require("url");

let win

const original = BrowserWindow.prototype.loadURL;
BrowserWindow.prototype.loadURL = function (url, options) {
  this.loadedURL = url;
  return original.bind(this)(url, options);
}

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
      webSecurity: !process.env.DISABLE_CORS,
      preload: path.join(__dirname, './electron/preload.js')
    },
    icon: path.join(__dirname, 'build/icons/icon.png')
  })

  if (isDev) {
    win.loadURL('http://localhost:4200/')
    win.webContents.openDevTools();
  } else {
    win.loadURL(getBundleUrl());
  }

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
      '../build/index.html'),
    protocol: 'file:',
    slashes: true
  })
}
