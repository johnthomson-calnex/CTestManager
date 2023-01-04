import React, { useContext } from "react"
import ParameterWindow from "./parameters/ParameterWindow"
import "./TestsWindow.css"
import { ParameterContext } from "../../App"

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
                <div className="tests-left-buttons">
                    b 
                </div>
            </div>

            <div className="tests-right">
                <div className="tests-right-info">
                    {activeParameter?.fileName}
                </div>
                <div className="tests-right-content">
                    content
                </div>
            </div>

       </div>
    
    </>)
}

export default TestsWindow