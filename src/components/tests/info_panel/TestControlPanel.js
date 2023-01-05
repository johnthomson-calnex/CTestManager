
import React, { useContext, useEffect, useState } from "react";
import { ParameterContext, TestContext } from "../../../App";
import {v4 as uuid} from "uuid"
const { ipcRenderer } =  window.require("electron")

const TestControlWindow = props => {

    const {activeParameter} = useContext(ParameterContext)
    const {activeTest} = useContext(TestContext)
    const [showButton,setShowButton] = useState(false)

    const canRunTest = () => {
        setShowButton(  activeParameter?.fileName && activeTest?.fileName)
    }

    useEffect(() => {
        canRunTest()
    }, [activeParameter,activeTest])

    const runTest = () => {
        if(!activeParameter || !activeTest ) return
        const parameterStrSplit = activeParameter.fullPath.split("\\")
        const parameterStr = parameterStrSplit[parameterStrSplit.length-1].replace(".py", "")
        ipcRenderer.send("tests-run-single-test", activeTest.fullPath,parameterStr, uuid())
    }

    return (<>
        <div className="test-control-test">
            <div className="lbl">Selected Test: </div>
            <div>
            {activeTest ? activeTest.fileName : "None selected"}
            </div>
        </div>
        <div className="test-control-parameter">
            <div className="lbl">Selected Parameter:</div>
            <div>{activeParameter ? activeParameter.fileName : "None selected"}</div>
        </div>
        <div className="test-control-button">
            <button className="run-test-button" disabled={!showButton} onClick={runTest}>Run Test</button>
        </div>
    
    </>)
}

export default TestControlWindow