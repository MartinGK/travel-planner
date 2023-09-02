import Text from "../../../src/components/Text";
import { fireEvent, render, screen } from "@testing-library/react";

const testText = "Test";
const onClickMock = jest.fn();

describe("Text primary", () => {
  beforeEach(() => {
    render(<Text onClick={onClickMock}>{testText}</Text>);
  });

  it("should render", () => {
    const textComponent = screen.getByText(testText);
    expect(textComponent).toBeInTheDocument();
  });

  it("should with black-0 color", () => {
    const textComponent = screen.getByText(testText);
    expect(textComponent).toHaveClass("black-0");
  });

  it("call onClick", () => {
    const textComponent = screen.getByText(testText);
    fireEvent.click(textComponent);
    expect(onClickMock).toHaveBeenCalled();
  });
});

describe("Text secondary", () => {
  beforeEach(() => {
    render(
      <Text onClick={onClickMock} secondary>
        {testText}
      </Text>
    );
  });
  it("should with text-purple color", () => {
    const textComponent = screen.getByText(testText);
    expect(textComponent).toHaveClass("text-purple");
  });
});
