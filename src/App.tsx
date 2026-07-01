import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Variables from "./pages/Variables";
import VariableDetails from "./pages/VariableDetails";
import Navbar from "./components/NavBar/Navbar.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/variables" element={<Variables/>}/>
          <Route path="/variables/:variableId" element={<VariableDetails />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

  export default App;