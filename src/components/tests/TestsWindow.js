import React, { useContext } from "react"
import ParameterWindow from "./parameters/ParameterWindow"
import "./TestsWindow.css"
import { ParameterContext } from "../../App"
import TestControlWindow from "./info_panel/TestControlPanel"

const TestsWindow = props => {

    const {activeParameter} = useContext(ParameterContext)

    return (<>
    
       <div className="tests-window">

            <div className="tests-left">
                <div className="tests-left-parameters">
                    <ParameterWindow {...props} />
                </div>
                <div className="tests-left-tests">
                    tests
                </div>
            </div>

            <div className="tests-right">
                <div className="tests-right-info">
                    <TestControlWindow {...props} />
                </div>
                <div className="tests-right-content">
                    content
                </div>
            </div>

       </div>
    
    </>)
}

export default TestsWindow