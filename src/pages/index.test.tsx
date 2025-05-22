import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";

import { IndexPage } from "./index";
import { getPets } from "../controllers/getPets";
import { PetListInfo } from "../types";
import { AppStateProvider } from "../context/AppContext";
import { MemoryRouter } from "react-router-dom";

vi.mock("../controllers/getPets");

const mockAdaptedData = {
  id: 1,
  name: "Jade",
  kind: "dog",
  image: { src: "img.jpg", alt: "Jade the dog" },
  health: "healthy",
  weight: 10,
  height: 12,
  length: 14,
  description: "bub bub",
} as PetListInfo;

vi.mocked(getPets).mockResolvedValue({ pets: [mockAdaptedData], totalPets: 1 });

const renderComponent = () =>
  render(
    <MemoryRouter>
      <AppStateProvider>
        <IndexPage />
      </AppStateProvider>
    </MemoryRouter>,
  );
describe("IndexPage", () => {
  it("renders the pets dashboard page", () => {
    renderComponent();
    expect(screen.getByTestId("pets-dashboard-page")).toBeInTheDocument();
  });

  it("renders the Layout component", () => {
    renderComponent();
    expect(screen.getByTestId("pets-dashboard-page").querySelector("header")).toBeInTheDocument();
  });

  it("fetches and displays pets data", async () => {
    renderComponent();
    const cellData = await screen.findByText("Jade");
    expect(cellData).toBeInTheDocument();
  });
});
