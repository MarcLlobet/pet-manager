import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("should render the initial count", async () => {
    render(<Counter />);

    expect(screen.getByText(/Counter 0/i)).toBeInTheDocument();
  });

  it("should increment the count when clicked", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: /Counter 0/i });

    fireEvent.click(button);

    expect(screen.getByText(/Counter 1/i)).toBeInTheDocument();
  });
});
