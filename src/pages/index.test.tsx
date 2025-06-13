import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";

import IndexPage from "./index";
import { AppStateProvider } from "../context/AppContext";
import { MemoryRouter } from "react-router-dom";

const renderComponent = () =>
  render(
    <AppStateProvider>
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    </AppStateProvider>,
  );
describe("IndexPage", () => {
  it("renders the pets dashboard page", () => {
    renderComponent();
    expect(screen.getByTestId("pets-dashboard-page")).toBeInTheDocument();
  });

  it("fetches and displays pets data", async () => {
    renderComponent();
    const cellData = await screen.findByText("Mock - Jade");
    expect(cellData).toBeInTheDocument();
  });
});
