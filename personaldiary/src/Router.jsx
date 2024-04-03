import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import ShowDairy from "./pages/ShowDairy";
import WriteDairy from "./pages/WriteDairy";
import './styles/Router.css'
import Profile from "./pages/Profile";

const Router = () => {
  return (
    <>
      <div className="header-in-Router">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/showDairy" element={<ShowDairy/>} />
        <Route path="/writeDairy" element={<WriteDairy/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
