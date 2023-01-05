import React, {useEffect,useState,useContext} from "react";
import { TestContext } from "../../../App";
const {ipcRenderer} = window.require('electron')

const TestsPanel = props => {


    const {setActiveTest,activeTest} = useContext(TestContext)
    const [allTestPaths,setAllTestPaths] = useState(null)
    const [,setTestFolderBasePath] = useState(null)

    useEffect(() => {
        getAllTestFiles()
    }, [])

    const getAllTestFiles = () => {
        ipcRenderer.send('tests-get-all-tests')
    }

    // listens for the test paths from server. The base path is returned along with an array of all test paths.
    // ie C:\user\documents\Tests\ and C:\user\documents\Tests\test1.py
    // the base path is then stripepd off so we only see the test1.py
    ipcRenderer.on('tests-return-all-tests', (event,testFolderPath,ptestPaths) => {
        const trimmedPaths = ptestPaths.map(path => {
            return path.replace(`${testFolderPath}\\`, "")
        })
        setAllTestPaths(trimmedPaths)
        setTestFolderBasePath(testFolderPath)
    })

    // loops over all parameter paths and displays them
    const displayTests = () => {
        if(!allTestPaths) return
        return allTestPaths.map(path => {
            return <div className="parameter-item" key={path} onClick={() => selectTest(path)} style={{color :activeTest && activeTest.fullPath === path ? "grey" : "" }}>{path}</div>
        })
    }

    const selectTest = testPath => {
        const splitPath = testPath.split("\\")
        setActiveTest({
            fullPath : testPath,
            fileName : splitPath[splitPath.length-1]
        })
    }


    return (<>
    
        <div className="parameter-window">
            {displayTests()}
        </div>
    
    </>)
}

export default TestsPanel