import CounterInput from "../../../../src/components/inputs/CounterInput";
import { act, fireEvent, render, screen } from "@testing-library/react";
const errorMessage = "Select passengers";
const onChangeMock = jest.fn();

describe("CounterInput", () => {
  beforeEach(() => {
    render(<CounterInput onChange={onChangeMock} errorMessage="Select passengers" error={false} /> );
  });

  it("should render an input", () => {
    const input = screen.getByRole("input", { name: /counter/i });
    expect(input).toBeInTheDocument();
  });

  it("should render a minus button", () => {
    const input = screen.getByRole("button", { name: /minus/i });
    expect(input).toBeInTheDocument();
  });

  it("should render a plus button", () => {
    const input = screen.getByRole("button", { name: /plus/i });
    expect(input).toBeInTheDocument();
  });

  it("should render a value", () => {
    const input = screen.getByRole("input", { name: /counter/i });
    expect(input).toHaveValue(0);
  });

  it("shouldn't render errorMessage if error is false", () => {
    const input = screen.getByText(errorMessage);
    expect(input).toBeNull();
  });

  describe("when a button is clicked", () => {
    it("shouldn't subtract if the value is 0", () => {
      const input = screen.getByRole("input", { name: /counter/i });
      expect(input).toHaveValue(0);
      const minusButton = screen.getByRole("button", { name: /minus/i });
      act(() => fireEvent.click(minusButton))
      expect(input).toHaveValue(0);
    });

    it("should increase the value by 1", () => {
      const input = screen.getByRole("input", { name: /counter/i });
      expect(input).toHaveValue(0);
      const plusButton = screen.getByRole("button", { name: /plus/i });
      act(() => fireEvent.click(plusButton))
      expect(input).toHaveValue(1);
    });

    it("should subtract by 1 if the value is greater than 1", () => {
      const input = screen.getByRole("input", { name: /counter/i });
      expect(input).toBeGreaterThan(0);
      const plusButton = screen.getByRole("button", { name: /plus/i });
      act(() => fireEvent.click(plusButton))
      expect(input).toHaveValue(0);
    });
    
    it("should call onChangeMock", () => {
      const plusButton = screen.getByRole("button", { name: /plus/i });
      act(() => fireEvent.click(plusButton))
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});

describe("error case", () => {
  beforeEach(() => {
    render(<CounterInput onChange={onChangeMock} errorMessage="Select passengers" error={true}/>);
  });

  it("should render an error", () => {
    const input = screen.getByText(errorMessage);
    expect(input).toBeInTheDocument();
  });
});
