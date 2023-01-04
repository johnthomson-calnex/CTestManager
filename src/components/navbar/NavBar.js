import React from "react"
import "./NavBar.css"

const NavBar = props => {

    const {activeNavTab,setActiveNavTab} = props

    const navTabClick = tab => {
        if(activeNavTab)
            document.getElementById(`nav-${activeNavTab}`).classList.remove("active-nav-tab")
        document.getElementById(`nav-${tab}`).classList.add("active-nav-tab")
        setActiveNavTab(tab)
    }

    

    return(<>
    
        <nav className="navbar">

            <ul className="navbar-ul">

                <li className="navbar-li active-nav-tab" onClick={() => navTabClick("tests")} id="nav-tests" >
                    Tests
                </li>

                <li className="navbar-li" onClick={() => navTabClick("jobs")} id="nav-jobs">
                    Jobs
                </li>

                <li className="navbar-li" onClick={() => navTabClick("reports")} id="nav-reports">
                    Reports
                </li>

            </ul>

        </nav>
    
    </>)
}

export default NavBar