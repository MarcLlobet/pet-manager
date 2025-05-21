import React from "react";
import { Routes, Route } from "react-router-dom";
import { IndexPage } from "../pages/index";
import { PetPage } from "../pages/pet";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/:id" element={<PetPage />} />
  </Routes>
);
