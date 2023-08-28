import CounterButton from "../../../../src/components/inputs/CounterInput/CounterButton";
import { fireEvent, render, screen } from "@testing-library/react";

const content = "+";
const onClick = jest.fn();

describe("CounterButton", () => {
  beforeEach(() => {
    render(<CounterButton onClick={onClick}> {content} </CounterButton>);
  });

  it("should render a button", () => {
    const button = screen.getByRole("button", { name: content });
    expect(button).toBeInTheDocument();
  });

  it("should change background on hover", () => {
    const button = screen.getByRole("button", { name: content });
    expect(button).toHaveClass("bg-purple-600");
    fireEvent.mouseOver(button);
    expect(button).toHaveClass("bg-purple-200");
  });

  it("should call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: content });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe("CounterButton disabled", () => {
  beforeEach(() => {
    render(<CounterButton onClick={onClick} disabled> {content} </CounterButton>);
  });
  it("shouldn't change background on hover", () => {
    const button = screen.getByRole("button", { name: content });
    expect(button).toHaveClass("bg-purple-600");
    fireEvent.mouseOver(button);
    expect(button).toHaveClass("bg-purple-600");
  });

  it("shouldn't call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: content });
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});