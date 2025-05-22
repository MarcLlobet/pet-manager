import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PetPage } from "./pet";
import { getPetById } from "../controllers/getPetById";
import { PetDetailInfo } from "../types";

vi.mock("../controllers/getPetById");

describe("PetPage", () => {
  const mockPet = {
    image: {
      src: "img.jpg",
      alt: "Jade the dog",
    },
    details: [
      { title: "id", value: 1 },
      { title: "name", value: "Jade" },
      { title: "kind", value: "dog" },
      { title: "health", value: "healthy" },
      { title: "weight", value: 10 },
      { title: "height", value: 12 },
      { title: "length", value: 14 },
      { title: "description", value: "bub bub" },
    ],
  } as PetDetailInfo;

  beforeEach(() => {
    vi.mocked(getPetById).mockResolvedValue(mockPet);
  });

  it("renders the pet details page", async () => {
    render(
      <MemoryRouter initialEntries={["/1"]}>
        <Routes>
          <Route path="/:id" element={<PetPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId("pet-details-page")).toBeInTheDocument();
  });

  it("renders the DetailView component when pet data is loaded", async () => {
    render(
      <MemoryRouter initialEntries={["/1"]}>
        <Routes>
          <Route path="/:id" element={<PetPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByAltText("Jade the dog")).toBeInTheDocument();
    expect(await screen.findByText("name")).toBeInTheDocument();
    expect(await screen.findByText("Jade")).toBeInTheDocument();
  });
});
