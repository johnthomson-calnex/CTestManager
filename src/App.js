import { HashRouter, Routes, Route } from "react-router-dom";
import MainWindow from "./components/main/MainWindow";
import "./App.css"

function App() {
  return (<>
    
      <HashRouter>

        <Routes>

          <Route path="/" exact element={<MainWindow />}/>

        </Routes>

      </HashRouter>


  </>);
}

export default App;
