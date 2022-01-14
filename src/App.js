import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Info from "./components/Info";
// var _ = require("lodash");

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/info" element={<Info />} />
        </Routes>
    </Router>
  );
}

export default connect((state) => {
  return state;
})(App);
