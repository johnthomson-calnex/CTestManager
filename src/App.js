import { HashRouter, Routes, Route } from "react-router-dom";
import MainWindow from "./components/main/MainWindow";
import "./App.css"
import React, {createContext, useState} from "react"

export const ParameterContext = createContext(null)
export const TestContext = createContext(null)
function App() {

  const [selectedParameter,setSelectedParameter] = useState(null)
  const [selectedTest,setSelectedTest] = useState(null)

  return (<>
    
    <TestContext.Provider value={{
      selectedTest,
      setSelectedTest
    }}>
        <ParameterContext.Provider value={{
          selectedParameter,
          setSelectedParameter
        }}>

          <HashRouter>

            <Routes>

              <Route path="/" exact element={<MainWindow />}/>

            </Routes>

          </HashRouter>

        </ParameterContext.Provider>
      </TestContext.Provider>

  </>);
}

export default App;
