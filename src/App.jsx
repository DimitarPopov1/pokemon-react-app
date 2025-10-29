import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./assets/app.css";

function App() {
  const [filters, setFilters] = useState({
    hp: { min: 0, max: 1000 },
    attack: { min: 0, max: 1000 },
    defense: { min: 0, max: 1000 },
  });

  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar filters={filters} setFilters={setFilters} />
        <Content filters={filters} />
      </div>
    </>
  );
}

export default App;
