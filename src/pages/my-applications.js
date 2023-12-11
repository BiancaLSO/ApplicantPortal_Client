import React from "react";
import Navbar from "../components/navbar"; // Import your Navbar component
import Footer from "../components/footer"; // Import your Navbar component

import "../css/layout.css"; // Import your custom styles

const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <div className="content-container">
        {/* Content goes here */}
        {/* You can import and place your components within this container */}
      </div>

      <Footer />
    </div>
  );
};

export default App;
