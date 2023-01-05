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

const getAllTests = (event,repositoryRoot,ignoreFolders) => {
    try {
        //const testFolder = path.join(repositoryRoot,"Parameters")
        testFolder = repositoryRoot
        dir.promiseFiles(testFolder)
        .then(testPaths => {
                testPaths = testPaths.filter(path => {
                path = path.replace(repositoryRoot+"\\", "")
                const splitPath = path.split("\\")
                console.log(splitPath)
                if(!ignoreFolders.includes(splitPath[0]))
                    return path
            })
            if(testPaths)
                event.reply('tests-return-all-tests', testFolder, testPaths)
            
        })
        .catch(error => {
            console.log(`Tests::getAllTests ${error}`)
        })        
    }
    catch(e)
    {
        console.log(e)
    }
    
}

module.exports = {getAllParameters, getAllTests}