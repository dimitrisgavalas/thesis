import React from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ToolbarMenu from "./components/Toolbar/Toolbar";
import SingleEcourse from "./components/EcoursesPages/SingleEcoursePage/SingleEcourse";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Ecourses from "./pages/Ecourses/Ecourses";
import UserProfile from "./components/UserProfile/UserProfile";
import Favorites from "./components/Favorites/Favorites";
import AddCourse from "./components/AddCourse/AddCourse";
import { Rating } from "primereact/rating";
import CommentAndRating from "./components/Ratings/Rating";
// import uniProfile from "./components/uniProfile/uniProfile";

function App() {
  return (
    <div className="container-fluid">

      <BrowserRouter>
      <ToolbarMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/singleEcourse/:id" element={<SingleEcourse />} />
          <Route path="/ecourses/ecoursemainpage" element={<Ecourses />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/uniprofile"
            element={<UserProfile isUniversityUser={true} />}
          />
          <Route path="/ratings" element={<CommentAndRating />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

      <Footer />
      {/* <Contact /> */}
      {/* me routing */}
    </div>
  );
}

export default App;
// sta shared loading etc
