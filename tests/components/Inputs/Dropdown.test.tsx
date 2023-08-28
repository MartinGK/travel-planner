import Dropdown from "../../../src/components/Inputs/Dropdown";
import { fireEvent, render, screen } from "@testing-library/react";

const dropdownItems = ["Paris", "Montpellier", "Aix-en-Provence"];
const onClickMock = jest.fn();

describe("Dropdown", () => {
  beforeEach(() => {
    render(<Dropdown items={dropdownItems} onClickItem={onClickMock} />);
  });

  it("should render", () => {
    const dropdown = screen.getByRole("input", { name: /dropdown/i });
    expect(dropdown).toBeInTheDocument();
  });

  it("should render all items", () => {
    dropdownItems.forEach((item) => {
      const dropdownItem = screen.getByText(item);
      expect(dropdownItem).toBeInTheDocument();
    });
  });

  it("should call onClickItem when item is clicked", () => {
    const dropdownItem = screen.getByText(dropdownItems[0]);
    dropdownItem.click();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should change item background color on hover", () => {
    const dropdownItem = screen.getByText(dropdownItems[0]);
    fireEvent.mouseOver(dropdownItem);
    expect(dropdownItem).toHaveClass("bg-purple-200");
  });
});
