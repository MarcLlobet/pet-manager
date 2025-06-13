import { beforeAll, describe, expect, it, vi } from "vitest";

import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { AppStateProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeContext";
import { Layout } from "./Layout";

vi.mock("../containers/PetOfTheDayModal", () => ({
  default: () => <div data-testid="pet-of-the-day-modal" />,
}));

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("Layout", () => {
  const renderWithProviders = (outletContent?: React.ReactNode) =>
    render(
      <ThemeProvider>
        <AppStateProvider>
          <MemoryRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={outletContent ?? <div>Home</div>} />
              </Route>
            </Routes>
          </MemoryRouter>
        </AppStateProvider>
      </ThemeProvider>,
    );

  it("renders the header", async () => {
    renderWithProviders();

    expect(await screen.findByTestId("logo")).toBeInTheDocument();
  });

  it("renders the children content via Outlet", () => {
    renderWithProviders(<div>Test Content</div>);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
