import DatePicker from "../../../src/components/Inputs/DatePicker";
import { render, screen } from "@testing-library/react";

//I'll use a third party library for the date picker, so I'll just test if it renders
describe("DatePicker", () => {
  beforeEach(() => {
    render(<DatePicker />);
  });

  it("should render", () => {
    const datePicker = screen.getByRole("input", { name: /date-picker/i });
    expect(datePicker).toBeInTheDocument();
  });
});
