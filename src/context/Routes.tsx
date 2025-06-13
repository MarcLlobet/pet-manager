import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";

const IndexPage = lazy(() => import("../pages/index"));
const PetPage = lazy(() => import("../pages/pet"));

export const AppRoutes = () => (
  <Suspense fallback={<Layout />}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path=":id" element={<PetPage />} />
      </Route>
    </Routes>
  </Suspense>
);
