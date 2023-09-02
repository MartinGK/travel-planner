import TextCloud from "../../../src/components/PurpleCloud";
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
  
  it("should be with border-purple color", () => {
    const textComponent = screen.getByText(textContent);
    expect(textComponent).toHaveClass("border-purple");
  });
});
