import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppRoutes } from "./Routes";
import { MemoryRouter } from "react-router-dom";
import { ReactNode } from "react";

vi.mock("../pages/index", () => ({ default: () => <div data-testid="index-page">IndexPage</div> }));
vi.mock("../pages/pet", () => ({ default: () => <div data-testid="pet-page">PetPage</div> }));

describe("AppRoutes", () => {
  it("renders the index page on /", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(await screen.findByTestId("index-page")).toBeInTheDocument();
  });

  it("renders the pet page on /:id", async () => {
    render(
      <MemoryRouter initialEntries={["/123"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(await screen.findByTestId("pet-page")).toBeInTheDocument();
  });

  it("shows the layout always", async () => {
    render(
      <MemoryRouter initialEntries={["/any"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });
});
