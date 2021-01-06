const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const { app, BrowserWindow, ipcMain } = electron  // overall running app process


let mainWindow
// wait for ready event to be issued
app.on('ready',()=>{
    console.log('App is now ready')

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    }) //creates a browser window
    mainWindow.loadFile('./views/index.html')
})

// receiving info from main window
ipcMain.on('getVideoFileLength',(event, path)=>{
    ffmpeg.ffprobe(path,(err,metadata)=>{
        //after ffprobe has completed running
        console.log('Video Duration:',metadata.format.duration)
        mainWindow.webContents.send('getMetaData',metadata.format.duration)
    })
})