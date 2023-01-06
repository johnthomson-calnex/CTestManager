
import React, { useContext, useEffect, useState } from "react";
import { ParameterContext, TestContext } from "../../../App";
import {v4 as uuid} from "uuid"
const { ipcRenderer } =  window.require("electron")

const TestControlWindow = props => {

    const {selectedParameter} = useContext(ParameterContext)
    const {selectedTest} = useContext(TestContext)
    const [showButton,setShowButton] = useState(false)

    const canRunTest = () => {
        setShowButton(  selectedParameter?.fileName && selectedTest?.fileName)
    }

    useEffect(() => {
        canRunTest()
    }, [selectedParameter,selectedTest])

    const runTest = () => {
        if(!selectedParameter || !selectedTest ) return
        const parameterStrSplit = selectedParameter.fullPath.split("\\")
        const parameterStr = parameterStrSplit[parameterStrSplit.length-1].replace(".py", "")
        ipcRenderer.send("tests-run-single-test", selectedTest.fullPath,parameterStr, uuid())
    }

    return (<>
    <div className="window-header">Test Control</div>
        <div className="test-control-test">
            <div className="lbl">Selected Test: </div>
            <div>
            {selectedTest ? selectedTest.fileName : "None selected"}
            </div>
        </div>
        <div className="test-control-parameter">
            <div className="lbl">Selected Parameter:</div>
            <div>{selectedParameter ? selectedParameter.fileName : "None selected"}</div>
        </div>
        <div className="test-control-button">
            <button className="run-test-button" disabled={!showButton} onClick={runTest}>Run Test</button>
        </div>
    
    </>)
}

export default TestControlWindow