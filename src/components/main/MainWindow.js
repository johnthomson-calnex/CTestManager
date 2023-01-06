import React, { useContext, useState } from "react"
import { ActiveTestsContext } from "../../App"
import NavBar from "../navbar/NavBar"
import TestsWindow from "../tests/TestsWindow"
const {ipcRenderer} = window.require("electron")

const MainWindow = props => {

    const [activeNavTab, setActiveNavTab] = useState("tests")
    const {activeTests,setActiveTests} = useContext(ActiveTestsContext)

    ipcRenderer.on('tests-test-finished',(event, id) => {
        const currentActiveTests = [...activeTests]
        const updatedActiveTests = currentActiveTests.filter(test => test.id !== id )
        setActiveTests(updatedActiveTests)

    })
    

    return (<>
    
        <NavBar {...props} setActiveNavTab={setActiveNavTab} activeNavTab={activeNavTab} />


        {activeNavTab === "tests" && <TestsWindow {...props} />}
        {activeNavTab === "jobs" && <div>Jobs</div>}
        {activeNavTab === "reports" && <div>Reports</div>}
    
    </>)
}

export default MainWindow
