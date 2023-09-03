import CounterButton from "../../../../src/components/Form/CounterInput/CounterButton";
import { fireEvent, render, screen } from "@testing-library/react";

const content = "+";

describe("CounterButton", () => {
  const onClick = jest.fn();
  beforeEach(() => {
    render(<CounterButton onClick={onClick}>{content}</CounterButton>);
  });

  it("should render a button", () => {
    const button = screen.getByRole("button", { name: "counter-button" });
    expect(button).toBeInTheDocument();
  });

  it("should change background on hover", () => {
    const button = screen.getByRole("button", { name: "counter-button" });
    expect(button).toHaveClass("bg-light-purple");
    fireEvent.mouseOver(button);
    expect(button).toHaveClass("hover:bg-purple");
  });

  it("should call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: "counter-button" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe("CounterButton disabled", () => {
  const onClick = jest.fn();
  beforeEach(() => {
    render(
      <CounterButton onClick={onClick} disabled>
        {content}
      </CounterButton>
    );
  });
  it("shouldn't change background on hover", () => {
    const button = screen.getByRole("button", { name: "counter-button" });
    expect(button).toHaveClass("bg-light-purple");
    fireEvent.mouseOver(button);
    expect(button).toHaveClass("bg-light-purple");
  });

  it("shouldn't call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: "counter-button" });
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
