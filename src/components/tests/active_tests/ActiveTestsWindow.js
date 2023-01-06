import React, { useContext } from "react";
import { ActiveTestsContext } from "../../../App";

const ActiveTestsWindow = props => {

    const {activeTests} = useContext(ActiveTestsContext)

    const displayActiveTests = () => {
        
        return activeTests.map(test => {
            return <div className="active-test-item">
                <div className="active-test-item-name"> {test.name}</div>
                <div class="loading-icon"><div></div><div></div><div></div><div></div></div>               
            </div>
        })
    }

    return (<>

    <div className="window-header">Active Tests</div>

    <div className="active-tests-content">
        {(!activeTests || activeTests.length === 0) ? <div className="no-active-tests">No active tests</div> : displayActiveTests() }
        
    </div>
    
    </>)
}

export default ActiveTestsWindow