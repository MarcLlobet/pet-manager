import React from "react";
import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";
import { AppStateProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("Layout", () => {
  const renderWithProviders = (ui: React.ReactNode) =>
    render(
      <MemoryRouter>
        <AppStateProvider>
          <ThemeProvider>{ui}</ThemeProvider>
        </AppStateProvider>
      </MemoryRouter>,
    );

  it("renders the header", () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders the children content", () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
