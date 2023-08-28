import ArrowCircled from "../../../src/components/icons/ArrowCircled";
import { render, screen } from "@testing-library/react";

describe("Arrow left", () => {
  beforeEach(() => {
    render(<ArrowCircled direction="left" />);
  });

  it("should render", () => {
    const icon = screen.getByRole("icon", { name: /arrow-circled/i });
    expect(icon).toBeInTheDocument();
  });

  it("should have the class rotate-0", () => {
    const icon = screen.getByRole("icon", { name: /arrow-circled/i });
    expect(icon).toHaveClass("rotate-0");
  });
});

describe("Arrow right", () => {
  beforeEach(() => {
    render(<ArrowCircled direction="right" />);
  });

  it("should have the class rotate-180", () => {
    const icon = screen.getByRole("icon", { name: /arrow-circled/i });
    expect(icon).toHaveClass("rotate-180");
  });
});
