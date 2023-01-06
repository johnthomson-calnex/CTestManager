import React, { useContext } from "react"
import ParameterWindow from "./parameters/ParameterWindow"
import "./TestsWindow.css"
import { ParameterContext } from "../../App"
import TestControlWindow from "./info_panel/TestControlPanel"
import TestsPanel from "./tests_panel/TestsPanel"
import ActiveTestsWindow from "./active_tests/ActiveTestsWindow"


const TestsWindow = props => {


    return (<>
    
       <div className="tests-window">

            <div className="tests-left">
                <div className="tests-left-parameters">
                    <ParameterWindow {...props} />
                </div>
                <div className="tests-left-tests">
                    <TestsPanel {...props} />
                </div>
            </div>

            <div className="tests-right">
                <div className="tests-right-info">
                    <div className="tests-right-info-control">
                        <TestControlWindow {...props} />
                    </div>
                    <div className="tests-right-info-active">
                        <ActiveTestsWindow {...props} />
                    </div>
                    
                </div>
                <div className="tests-right-content">
                    content
                </div>
            </div>

       </div>
    
    </>)
}

export default TestsWindow