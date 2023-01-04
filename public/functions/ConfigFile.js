const fs = require("fs")
const {app} = require("electron")
const os = require("os")
const path = require("path")
// config file should be in the same location as the .exe. This could be changed in future
const loadConfigFile =  () => {
    let jsonConfig = undefined
    const username = process.env["USERPROFILE"].split(path.sep)[2]

    let pathToConfig = `C:\\Users\\${username}\\Documents\\CalnexTestManager\\config\\`
    let fullConfigPath = `${pathToConfig}Config.json`
    try{
        const file = fs.readFileSync(fullConfigPath)
        jsonConfig = JSON.parse(file)
    }
    catch(e)
    {   //create directories
        fs.mkdirSync(pathToConfig, {recursive:true})

        //no config file so create new one
        let obj = {
            "repositoryRoot" : {
                "value" : "C:\\Users\\john.thomson\\Desktop\\github\\entry",
                "desc" : "The root of the repository where the tests and parameters files are. Ensure you use double \\ in the path"
            },
            "reportsRoot" : {
                "value" : "C:\\Users\\john.thomson\\Desktop\\github\\testresults",
                "desc" : "The root path where the reports are stored"
            },
            "ignoreRepositoryFoldersForTest" : {
                "value" : ["Parameters"],
                "desc": "An array of folder names that should not show up in the tests view"
            }
        }
        const jsonConfig = JSON.stringify(obj, null,4)
        try {
         fs.writeFileSync(fullConfigPath,jsonConfig)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    return jsonConfig
}

module.exports = {loadConfigFile}