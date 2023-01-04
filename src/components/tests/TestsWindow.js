import React from "react"
import "./TestsWindow.css"


const TestsWindow = props => {


    return (<>
    
       <div className="tests-window">

            <div className="tests-left">
                <div className="tests-left-parameters">
                    params
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
                    Test info
                </div>
                <div className="tests-right-content">
                    content
                </div>
            </div>

       </div>
    
    </>)
}

export default TestsWindow