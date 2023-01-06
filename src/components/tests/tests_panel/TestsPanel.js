import React, {useEffect,useState,useContext} from "react";
import { TestContext } from "../../../App";
const {ipcRenderer} = window.require('electron')

const TestsPanel = props => {


    const {setSelectedTest,selectedTest} = useContext(TestContext)
    const [allTestPaths,setAllTestPaths] = useState(null)
    const [testFolderBasePath,setTestFolderBasePath] = useState(null)

    useEffect(() => {
        getAllTestFiles()
    }, [])

    const getAllTestFiles = () => {
        ipcRenderer.send('tests-get-all-tests')
    }

    // listens for the test paths from server. The base path is returned along with an array of all test paths.
    // ie C:\user\documents\Tests\ and C:\user\documents\Tests\test1.py
    // the base path is then stripepd off so we only see the test1.py
    ipcRenderer.on('tests-return-all-tests', (event,testFolderPath,testPaths) => {
        
        setAllTestPaths(testPaths)
        setTestFolderBasePath(testFolderPath)
    })

    // loops over all parameter paths and displays them
    const displayTests = () => {
        if(!allTestPaths) return
        return allTestPaths.map(path => {
            const trimmedPath = path.replace(`${testFolderBasePath}\\`, "")
            return <div className="parameter-item" key={path} onClick={() => selectTest(path)} style={{color :selectedTest && selectedTest.fullPath === path ? "grey" : "" }}>{trimmedPath}</div>
        })
    }

    const selectTest = testPath => {
        const splitPath = testPath.split("\\")
        setSelectedTest({
            fullPath : testPath,
            fileName : splitPath[splitPath.length-1]
        })
    }


    return (<>
        <div className="window-header">Tests</div>
        <div className="parameter-window">
            {displayTests()}
        </div>
    
    </>)
}

export default TestsPanel