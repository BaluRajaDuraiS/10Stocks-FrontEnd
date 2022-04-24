import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Stock from "./Pages/Stock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="home/stock/:index" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
