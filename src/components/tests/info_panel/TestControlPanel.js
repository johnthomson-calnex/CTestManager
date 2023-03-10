
import React, { useContext, useEffect, useState } from "react";
import { ActiveTestsContext, ParameterContext, TestContext } from "../../../App";
import {v4 as uuid} from "uuid"
const { ipcRenderer } =  window.require("electron")

const TestControlWindow = props => {

    const {selectedParameter,setSelectedParameter} = useContext(ParameterContext)
    const {setActiveTests} = useContext(ActiveTestsContext)
    const {selectedTest, setSelectedTest} = useContext(TestContext)
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
        const id = uuid()
        ipcRenderer.send("tests-run-single-test", selectedTest.fullPath,parameterStr, id)

        setActiveTests(prev => [...prev, {
            name : selectedTest.fileName,
            id
        }])
    }

    return (<>
    <div className="window-header">Test Control</div>
        <div className="test-control-test">
            <div className="lbl">Selected Test: </div>
            <div>
            {selectedTest ? selectedTest.fileName : "None selected"}
            </div>
            {selectedTest && <div className="cross" data-cross="Clear Test" onClick={() => setSelectedTest(null)}>X </div>}
        </div>
        <div className="test-control-parameter">
            <div className="lbl">Selected Parameter:</div>
            <div>{selectedParameter ? selectedParameter.fileName : "None selected"}</div>
            {selectedParameter && <div className="cross" data-cross="Clear Parameter" onClick={() => setSelectedParameter(null)} >X </div>}
        </div>
        <div className="test-control-button">
            <button className="run-test-button" disabled={!showButton} onClick={runTest}>Run Test</button>
        </div>
    
    </>)
}

export default TestControlWindow