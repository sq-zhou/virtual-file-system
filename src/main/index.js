'use strict'

import { app, BrowserWindow } from 'electron'
const electron = require('electron')
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 900,
    autoHideMenuBar: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// 文件的右击显示
export const menuForFile = new Menu()
menuForFile.append(new MenuItem({
  label: '打开',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('openFile')
  }
}))
menuForFile.append(new MenuItem({
  label: '剪切',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('cutFile')
  }
  }
))
menuForFile.append(new MenuItem({
  label: '复制',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('copyFile')
  }
  }
))
menuForFile.append(new MenuItem({
  label: '删除',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('deleteFile')
  }
}))
menuForFile.append(new MenuItem({
  label: '属性',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('fileProperty')
  }
}))
ipc.on('menuForFile', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menuForFile.popup(win)
})

// 文件夹的右击显示
export const menuForDir = new Menu()
menuForDir.append(new MenuItem({
  label: '打开',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('openFile')
  }
}))
menuForDir.append(new MenuItem({
  label: '删除',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('deleteFile')
  }
}))
ipc.on('menuForDir', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menuForDir.popup(win)
})
// 空白的右击显示
export const menuForWrapper = new Menu()
menuForWrapper.append(new MenuItem({
  label: '新建文件',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('newFile')
  }
}))
menuForWrapper.append(new MenuItem({
  label: '新建文件夹',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('newDir')
  }
}))
menuForWrapper.append(new MenuItem({
  label: '粘贴',
  click: function (item, focusedWindow) {
    focusedWindow.webContents.send('pasteFile')
  }
}))
ipc.on('menuForWrapper', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menuForWrapper.popup(win)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })

// app.on('ready', () => {
//   if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
// })
