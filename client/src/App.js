import React from "react";
import "./app.scss";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import Error from "./pages/ErrorPage/Error";

import Text from "./pages/testPage/Test";

const app = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/t" element={<Text />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default app;
