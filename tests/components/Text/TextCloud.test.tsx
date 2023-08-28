import TextCloud from "../../../src/components/Text/TextCloud";
import { render, screen } from "@testing-library/react";

const textContent = "test";

describe("TextCloud", () => {
  beforeEach(() => {
    render(<TextCloud>{textContent}</TextCloud>);
  });

  it("should render", () => {
    const textComponent = screen.getByText(textContent);
    expect(textComponent).toBeInTheDocument();
  });
  
  it("should be with purple-200 color", () => {
    const textComponent = screen.getByText(textContent);
    expect(textComponent).toHaveClass("purple-200");
  });
});
