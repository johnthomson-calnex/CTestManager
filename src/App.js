import { HashRouter, Routes, Route } from "react-router-dom";
import MainWindow from "./components/main/MainWindow";
import "./App.css"
import React, {createContext, useState} from "react"

export const ParameterContext = createContext(null)
export const TestContext = createContext(null)
export const ActiveTestsContext = createContext(null)

function App() {

  const [selectedParameter,setSelectedParameter] = useState(null)
  const [selectedTest,setSelectedTest] = useState(null)
  const [activeTests,setActiveTests] = useState(null)

  return (<>
    
    <TestContext.Provider value={{
      selectedTest,
      setSelectedTest
    }}>
        <ParameterContext.Provider value={{
          selectedParameter,
          setSelectedParameter
        }}>

          <ActiveTestsContext.Provider value={{
            activeTests,
            setActiveTests
          }}>

            <HashRouter>

              <Routes>

                <Route path="/" exact element={<MainWindow />}/>

              </Routes>

            </HashRouter>
          </ActiveTestsContext.Provider>
        </ParameterContext.Provider>
      </TestContext.Provider>

  </>);
}

export default App;
