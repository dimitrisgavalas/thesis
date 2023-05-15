import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import "./App.css";
import Footer from "./components/Footer/Footer";
import ToolbarMenu from "./components/Toolbar/Toolbar";
import Ecourses from "./pages/Ecourses/Ecourses";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Contact from "./pages/Contact/Contact";
// import Home from "./pages/Home";
// import Ecourses from "./pages/Ecourses";
import About from "./pages/About/About";

function App() {
  return (
    <div className="container-fluid">
      <ToolbarMenu />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/ecourses" element={<Ecourses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      {/* <Contact /> */}
      {/* me routing */}
      <Footer />
    </div>
  );
}

export default App;
// sta shared loading etc
