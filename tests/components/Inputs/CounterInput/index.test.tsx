import CounterInput from "../../../../src/components/Inputs/CounterInput";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import { Form } from "@radix-ui/react-form";

const name = "passenger";

describe("CounterInput", () => {
  const onChangeMock = jest.fn();
  beforeEach(() => {
    render(
      <Form>
        <CounterInput
          name={name}
          label="Passengers"
          value="0"
          onChange={onChangeMock}
          error={false}
        />
      </Form>
    );
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

  it("should call onChangeMock with an specific value", () => {
    const input = screen.getByRole("input", { name: /counter/i });
    fireEvent.change(input, { target: { value: 3 } });
    expect(onChangeMock).toHaveBeenCalledWith("3");
  });

  it("shouldn't render errorMessage if error is false", () => {
    const input = screen.queryByRole("alertdialog", { name });
    expect(input).toBeNull();
  });

  describe("when a button is clicked", () => {
    it("shouldn't subtract if the value is 0", () => {
      const input = screen.getByRole("input", { name: /counter/i });
      expect(input).toHaveValue(0);
      const minusButton = screen.getByRole("button", { name: /minus/i });
      act(() => fireEvent.click(minusButton));
      expect(input).toHaveValue(0);
    });

    describe("when the user increase the value by 1", () => {
      beforeEach(() => {
        const plusButton = screen.getByRole("button", { name: /plus/i });
        act(() => fireEvent.click(plusButton));
      });

      it("should call onChangeMock with 1", () => {
        expect(onChangeMock).toHaveBeenCalledWith("1");
      });

      it("should subtract by 1 if the value is greater than 1", () => {
        const input = screen.getByRole("input", { name: /counter/i });
        const minusButton = screen.getByRole("button", { name: /minus/i });
        act(() => fireEvent.click(minusButton));
        expect(input).toHaveValue(0);
      });

      it("should call onChangeMock", () => {
        expect(onChangeMock).toHaveBeenCalled();
      });

      describe("when the value is greater than 0", () => {
        beforeEach(() => {
          cleanup();
          render(
            <Form>
              <CounterInput
                name={name}
                label="Passengers"
                value="1"
                onChange={onChangeMock}
                error={false}
              />
            </Form>
          );
        });
        
        it("should call onChangeMock with 0 on subtract", () => {
          const minusButton = screen.getByRole("button", { name: /minus/i });
          act(() => fireEvent.click(minusButton));
          expect(onChangeMock).toHaveBeenCalledWith("0");
        });
      });
    });
  });
});

describe("error case", () => {
  const onChangeMock = jest.fn();
  beforeEach(() => {
    render(
      <Form>
        <CounterInput
          value="0"
          label="Passengers"
          name={name}
          onChange={onChangeMock}
          error={true}
        />
      </Form>
    );
  });

  it("should render an error", () => {
    const message = screen.getByRole("alertdialog");
    expect(message).toBeInTheDocument();
  });
});
