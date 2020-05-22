const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const ipc = electron.ipcMain


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 450,
    height: 450,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false,
    icon: __dirname + '/tartareicon.ico'
    //,frame: false
  })
  // and load the index.html of the app.
  win.removeMenu()
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function golog(){
  const client = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    },
    //resizable: false,
    icon: __dirname + '/tartareicon.ico'
    //,frame: false
  })
  // and load the index.html of the app.
  client.removeMenu()
  client.loadFile('hub.html')
  client.maximize()
  //client.webContents.openDevTools()

}

ipc.on('open-hub', function(event){
  golog()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
