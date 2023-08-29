import Button from "../../src/components/Button";
import { fireEvent, render, screen } from "@testing-library/react";

const content = "test";

describe("Button", () => {
const onClickMock = jest.fn();
  beforeEach(() => {
    render(<Button onClick={onClickMock}>{content}</Button>);
  });

  it("should render their content", () => {
    const buttonContent = screen.getByText(content);
    expect(buttonContent).toBeInTheDocument();
  });
  it("should render a button", () => {
    const button = screen.getByRole("button", { name: "button" });
    expect(button).toBeInTheDocument();
  });

  it("should call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: "button" });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});

describe("Button disabled", () => {
const onClickMock = jest.fn();
  beforeEach(() => {
    render(<Button onClick={onClickMock} disabled>{content}</Button>);
  });

  it("shouldn't call onClickMock on click", () => {
    const button = screen.getByRole("button", { name: "button" });
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
