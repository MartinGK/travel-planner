import TextInput from "../../../src/components/Inputs/TextInput";
import { fireEvent, render, screen } from "@testing-library/react";

const labelExample = "label example";
const errorMessage = "error message";
const onChangeMock = jest.fn();

describe("TextInput", () => {
  beforeEach(() => {
    render(
      <TextInput
        label={labelExample}
        onChange={onChangeMock}
        errorMessage={errorMessage}
        error={false}
      />
    );
  });

  it("should render", () => {
    const input = screen.getByRole("input", { name: /text-input/i });
    expect(input).toBeInTheDocument();
  });

  it("should render the label", () => {
    const label = screen.getByText(labelExample);
    expect(label).toBeInTheDocument();
  });

  it("should call onChange when input changes", () => {
    const input = screen.getByRole("input", { name: /text-input/i });
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("shouldn't show error message", () => {
    const error = screen.queryByText(errorMessage);
    expect(error).not.toBeInTheDocument();
  });

  it("should exist an X button", () => {
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeInTheDocument();
  });

  it("should delete the input value when the X button is clicked", () => {
    const input = screen.getByRole("input", { name: /text-input/i });
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);
    expect(input).toHaveValue("");
  });
});

describe("TextInput with error", () => {
  beforeEach(() => {
    render(
      <TextInput
        label={labelExample}
        onChange={onChangeMock}
        errorMessage={errorMessage}
        error={true}
      />
    );
  });

  it("should show error message", () => {
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
  });
});
