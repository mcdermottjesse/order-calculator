import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";

import reactLogo from "./assets/react.svg";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Router>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
