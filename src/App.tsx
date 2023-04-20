import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Recados from "./Pages/Lista-Recados";


function App() {
  return (
    <BrowserRouter>
      <Home/>
      <Recados/>
    </BrowserRouter>
  );
}

export default App;
