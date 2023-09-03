import DatePicker from "../../../src/components/Form/DatePicker";
import { Form } from "@radix-ui/react-form";
import { act, fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";

//I'll use a third party library for the date picker, so I'll just test if it renders
describe("DatePicker", () => {
  const onChangeMock = jest.fn();
  const today = dayjs().format("DD/MM/YYYY")
  beforeEach(() => {
    render(
      <Form>
        <DatePicker value={today} onChange={onChangeMock} />
      </Form>
    );
  });

  it("should render", () => {
    const datePicker = screen.getByRole("input", { name: /date-picker/i });
    expect(datePicker).toBeInTheDocument();
  });

  it("should call onChangeMock with an specific value", () => {
    const input = screen.getByRole("input", { name: /date-picker/i });
    fireEvent.click(input);
    const tomorrow = dayjs(today, "DD/MM/YYYY").add(1, "day")
    const nextDay = tomorrow.get("date");
    const dayToClick = screen.getAllByText(nextDay)[0];
    act(() => fireEvent.click(dayToClick));
    expect(onChangeMock).toHaveBeenCalledWith(tomorrow.format('DD/MM/YYYY'));
  });
});
