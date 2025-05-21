import { Route, Routes } from "react-router-dom";

import React from "react";

import { IndexPage } from "../pages/index";
import { PetPage } from "../pages/pet";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/:id" element={<PetPage />} />
  </Routes>
);
