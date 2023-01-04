import React, { useState } from "react"
import NavBar from "../navbar/NavBar"
import TestsWindow from "../tests/TestsWindow"

const MainWindow = props => {

    const [activeNavTab, setActiveNavTab] = useState("tests")

    return (<>
    
        <NavBar {...props} setActiveNavTab={setActiveNavTab} activeNavTab={activeNavTab} />


        {activeNavTab === "tests" && <TestsWindow {...props} />}
        {activeNavTab === "jobs" && <div>Jobs</div>}
        {activeNavTab === "reports" && <div>Reports</div>}
    
    </>)
}

export default MainWindow
