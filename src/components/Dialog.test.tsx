import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "./Dialog";
import { describe, expect, it, vi } from "vitest";

describe("Dialog", () => {
  it("renders the dialog content", () => {
    render(<Dialog onClose={vi.fn()} modalContent={<div>Test Content</div>} />);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onCloseMock = vi.fn();
    render(<Dialog onClose={onCloseMock} modalContent={<div>Test Content</div>} />);

    const closeButton = screen.getByLabelText("top-close");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
