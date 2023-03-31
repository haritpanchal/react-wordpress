import RegisterUser from "./components/registerUser/RegisterUser";
import Login from "./components/LoginUser";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <RegisterUser /> */}
      <Login />
    </div>
  );
}

export default App;
