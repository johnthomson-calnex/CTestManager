const dir = require("node-dir")
const path = require("path")
const getAllParameters = (event,repositoryRoot) => {
    try {
        const paramFolder = path.join(repositoryRoot,"Parameters")
        dir.promiseFiles(paramFolder)
        .then(paramPaths => {
            if(paramPaths)
                event.reply('tests-return-all-parameters', paramFolder, paramPaths)
            
        })
        .catch(error => {
            console.log(`Tests::getAllParameters ${error}`)
        })        
    }
    catch(e)
    {
        console.log(e)
    }
    
}

module.exports = {getAllParameters}