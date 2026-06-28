import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Variables from "./pages/Variables";
import Navbar from "./components/NavBar/Navbar.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/variables" element={<Variables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;