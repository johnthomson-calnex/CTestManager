import React, { useContext } from "react";
import { ParameterContext, TestContext } from "../../../App";

const TestControlWindow = props => {

    const {activeParameter} = useContext(ParameterContext)
    const {activeTest} = useContext(TestContext)

    const canRunTest = () => {
        return activeTest?.fileName && activeParameter?.fileName
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
            <button className="run-test-button" disabled={!canRunTest()}>Run Test</button>
        </div>
    
    </>)
}

export default TestControlWindow