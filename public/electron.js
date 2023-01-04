const {BrowserWindow,app} = require("electron")
require("@electron/remote/main").initialize()
const url = require("url")
const path = require("path")
const { createMainMenu } = require("./menus/MainMenu")

let mainWindow = null


const createMainWindow = () => {

    // create the main window
    mainWindow = new BrowserWindow({
        width:1366,
        height : 768,
        webPreferences : {
            devTools : true,
            enableRemoteModule : true,
            nodeIntegration : true,
            contextIsolation : false
        }
    })

    //specify main app url depending whether or not is is built(packaged) or in development
    const appURL = app.isPackaged ? url.format({
        pathname : path.join(__dirname, "index.html"),
        protocol : "file:",
        slashes : true
    })
    :
    "http://localhost:3000"

    mainWindow.loadURL(appURL)
    exports.mainWindow

}


app.on("ready", () => {
    try {
        createMainWindow()
        createMainMenu(mainWindow)

    }
    catch(e)
    {
        console.log(e)
    }


})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin")
        app.quit()
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0)
        createMainWindow()
})