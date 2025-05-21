import React from "react";
import { render, screen } from "@testing-library/react";
import { PetTableProps, Table } from "./Table";
import { AppStateProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { PetListInfo } from "../types";

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("Table", () => {
  const renderWithProviders = (ui: React.ReactNode) =>
    render(
      <MemoryRouter>
        <AppStateProvider>
          <ThemeProvider>{ui}</ThemeProvider>
        </AppStateProvider>
      </MemoryRouter>,
    );

  it("renders table headers correctly", () => {
    const mockProps: PetTableProps = {
      items: [],
      columns: ["id", "name", "kind"],
      totalPets: 0,
      rowsPerPage: 5,
      page: 0,
      orderBy: "id",
      orderType: "asc",
      onRequestSort: vi.fn(),
      onPageChange: vi.fn(),
      onRowsPerPageChange: vi.fn(),
    };

    renderWithProviders(<Table {...mockProps} />);

    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("kind")).toBeInTheDocument();
  });

  it("renders table rows correctly", () => {
    const mockProps: PetTableProps = {
      items: [
        { id: 1, name: "Jade", kind: "dog", weight: 1000, height: 50, length: 100, image: { src: "", alt: "" } },
      ] as PetListInfo[],
      columns: ["id", "name", "kind"],
      totalPets: 1,
      rowsPerPage: 5,
      page: 0,
      orderBy: "id",
      orderType: "asc",
      onRequestSort: vi.fn(),
      onPageChange: vi.fn(),
      onRowsPerPageChange: vi.fn(),
    };

    renderWithProviders(<Table {...mockProps} />);

    expect(screen.getByText("Jade")).toBeInTheDocument();
    expect(screen.getByText("dog")).toBeInTheDocument();
  });
});
