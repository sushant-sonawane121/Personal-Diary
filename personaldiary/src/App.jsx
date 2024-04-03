import Router from "./Router";
import Sidebar from "./components/Sidebar";
import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <main className="main-container d-flex flex-row">
        <div className="vh-100 sidebar-header-left ">
          <Sidebar />
        </div>
        <section className="w-100">
          <Router />
        </section>
      </main>
    </>
  );
}

export default App;
