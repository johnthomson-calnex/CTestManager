import React from "react";
import { TestContext } from "../../../App";
import { IpcRenderer } from "electron";


const TestsPanel = props => {

    const {setActiveTest, activeTest} = useContext(TestContext)
    const [allTestPaths,setAllTestPaths] = useState(null)
    const [,setTestsFolderBasePath] = useState(null)


    useEffect(() => {
        getAllTestFiles()
    }, [])

    const getAllTestFiles = () => {
        ipcRenderer.send('tests-get-all-tests')
    }

    // listens for the parameter paths from server. The base path is returned along with an array of all parameter paths.
    // ie C:\user\documents\Parameters\ and C:\user\documents\Parameters\param1.py
    // the base path is then stripepd off so we only see the param1.py
    ipcRenderer.on('tests-return-all-tests', (event,testsFolderPath,testsPaths) => {
        const trimmedPaths = testsPaths.map(path => {
            return path.replace(`${testsFolderPath}\\`, "")
        })
        setAllTestPaths(trimmedPaths)
        setTestsFolderBasePath(testsFolderPath)
    })

    // loops over all parameter paths and displays them
    const displayTests = () => {
        if(!allTestPaths) return
        return allTestPaths.map(path => {
            return <div className="parameter-item" key={path} onClick={() => selectParameter(path)} style={{color :activeTest && activeTest.fullPath === path ? "grey" : "" }}>{path}</div>
        })
    }

    const selectParameter = parameterPath => {
        const splitPath = parameterPath.split("\\")
        setActiveTest({
            fullPath : parameterPath,
            fileName : splitPath[splitPath.length-1]
        })
    }

    return (<>
        <div className="tests-window">
            {displayTests()}
        </div>
    </>)
}

export default TestsPanel