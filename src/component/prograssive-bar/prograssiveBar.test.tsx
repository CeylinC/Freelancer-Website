import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProgressiveBar } from "./PrograssiveBar";

describe("ProgressiveBar Component", () => {
  it("renders the ProgressiveBar component with active step", () => {
    const activeStep = 2;
    const isActive = false;
    render(<ProgressiveBar activeStep={activeStep} isActive={isActive} />);
    const stepElement = screen.getByTestId(`step-${activeStep - 1}`);
    expect(stepElement).toBeInTheDocument();
    const dataActiveAttribute = stepElement.getAttribute("data-active");
    expect(dataActiveAttribute).toBeDefined();
    if (dataActiveAttribute) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(dataActiveAttribute).toBe("false");
    }
  });

  it("renders the ProgressiveBar component with inactive step", () => {
    const activeStep = 2;
    const isActive = false;
    render(<ProgressiveBar activeStep={activeStep} isActive={isActive} />);
    expect(screen.getByTestId(`step-${activeStep - 1}`)).toHaveAttribute(
      "data-active",
      "false"
    );
  });

  it("renders the ProgressiveBar component with canceled work", () => {
    const activeStep = 2;
    const isActive = false;
    render(<ProgressiveBar activeStep={activeStep} isActive={isActive} />);
    userEvent.tab();
    expect(screen.getByText("Work is Canceled")).toBeInTheDocument();
  });
});
