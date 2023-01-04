const {Menu,app} = require("electron")

const createMenuItems = mainWindow => {
    return  [
        {
            label : "File",
            submenu : [
                {
                    label : "Configure"
                },
                {
                    role : "separator"
                },
                {
                    role : "quit"
                }
            ]
        },
        {
            label : "Dev",
            submenu : [
                {
                    label : "toggle Dev Tools",
                    click : async () => {
                        mainWindow.webContents.toggleDevTools()
                    },
                    accelerator : "Ctrl+D"
                }
            ]
        }
    ]
}

 const createMainMenu = mainWindow => {
    const menu = Menu.buildFromTemplate(createMenuItems(mainWindow))
    Menu.setApplicationMenu(menu)
}

module.exports = {createMainMenu}
