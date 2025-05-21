import { describe, expect, it } from "vitest";

import React from "react";

import { render, screen } from "@testing-library/react";

import { DetailView } from "./DetailView";

describe("DetailView", () => {
  it("renders the image with correct src and alt", () => {
    const mockItem = {
      image: { src: "test-image.jpg", alt: "Test Image" },
      details: [],
    };

    render(<DetailView item={mockItem} />);

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders the details list correctly", () => {
    const mockItem = {
      image: { src: "test-image.jpg", alt: "Test Image" },
      details: [
        { title: "Name", value: "Jade" },
        { title: "Weight", value: "1000 grams" },
      ],
    };

    render(<DetailView item={mockItem} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Jade")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("1000 grams")).toBeInTheDocument();
  });
});
