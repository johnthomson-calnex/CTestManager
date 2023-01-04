import React, { useEffect, useState } from "react"
const {ipcRenderer} = window.require('electron')

const ParameterWindow = props => {

    const [allParameterPaths,setAllParameterPaths] = useState(null)
    const [parameterFolderBasePath,setParameterFolderBasePath] = useState(null)

    useEffect(() => {
        getAllParameterFiles()
    }, [])

    const getAllParameterFiles = () => {
        ipcRenderer.send('tests-get-all-parameters')
    }

    // listens for the parameter paths from server. The base path is returned along with an array of all parameter paths.
    // ie C:\user\documents\Parameters\ and C:\user\documents\Parameters\param1.py
    // the base path is then stripepd off so we only see the param1.py
    ipcRenderer.on('tests-return-all-parameters', (event,parameterFolderPath,parameterPaths) => {
        const trimmedPaths = parameterPaths.map(path => {
            return path.replace(`${parameterFolderPath}\\`, "")
        })
        setAllParameterPaths(parameterPaths)
        setParameterFolderBasePath(parameterFolderPath)
    })

    // loops over all parameter paths and displays them
    const displayParameters = () => {
        if(!allParameterPaths) return
        return allParameterPaths.map(path => {
            return <div className="parameter-item" key={path}>{path}</div>
        })
    }

    return (<>
    
        <div className="parameter-window">
            {displayParameters()}
        </div>
    
    </>)
}

export default ParameterWindow