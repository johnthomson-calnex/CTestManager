const dir = require("node-dir")
const path = require("path")
const fs = require("fs")
const {spawn} = require("child_process")
const {Notification} = require("electron")
const getAllParameters = (event,repositoryRoot) => {
    try {
        const paramFolder = path.join(repositoryRoot,"Parameters")
        dir.promiseFiles(paramFolder)
        .then(paramPaths => {
            paramPaths = paramPaths.filter(path => {
                path = path.replace(repositoryRoot+"\\","")
                const splitPath = path.split("\\")
                if(!splitPath.includes("__pycache__"))
                    return path
            })
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
        
        testFolder = repositoryRoot
        dir.promiseFiles(testFolder)
        .then(testPaths => {
                testPaths = testPaths.filter(path => {
                path = path.replace(repositoryRoot+"\\", "")
                const splitPath = path.split("\\")
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

const runSingleTest = (event,test,parameter, id) => {
    try {
        const process = spawn('python', [test, parameter])
        
        const split = test.split("\\")
        const testPathTrimmed = split[split.length-1]

        process.on('close', code => {
            console.log(`Child process for ${testPathTrimmed} finished with exit code ${code}`)
            new Notification({title:"Test Finished", body: `${testPathTrimmed} has finished`}).show()
            event.reply("tests-test-finished", id)
        })

        process.stdout.on('data', data => {
            console.log(data.toString())
        })

        process.on("error", err => {
            console.log(`Error occurred: ${err} during ${testPathTrimmed}` )
            new Notification({title:"Test Error", body: `${testPathTrimmed} has an error`}).show()
            event.reply("tests-test-finished", id)
        })

    }
    catch(e) {
        console.log(e)
    }
}

const getFileContents = (event,filepath, type) => {
    try {
        const contents = fs.readFile(filepath, 'utf-8', (err,contents) => {
            if(err)
            {
                console.log(err)
            }
            else
            {
                const lines = []
                contents.split(/\r?\n/).forEach(line => {
                    lines.push(line)
                })
                if(type === "test")
                    event.reply('tests-return-test-file',lines)
                else
                    event.reply('tests-return-parameter-file', lines)
                fs.close(1)

            }
        });
    }
    catch(e)
    {
        console.log(e)
    }

}

module.exports = {getAllParameters, getAllTests, runSingleTest, getFileContents}