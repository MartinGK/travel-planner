import type { DatePickerProps } from "antd";
import { DatePicker as AntdDatePicker, Space } from "antd";
import ArrowCircled from "../../icons/ArrowCircled";
import { Field } from "@radix-ui/react-form";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import Label from "../Label";
import "./index.css";
import ErrorMessage from "../ErrorMessage";

type Props = {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export default function DatePicker({ value, onChange, error }: Props) {
  const uniqueId = uuid();

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date?.isBefore(dayjs().add(-1, "day"))) {
      return;
    }
    onChange(dateString);
  };

  return (
    <Field name="date" className="flex flex-col mt-1">
      <Label htmlFor={uniqueId}>Date</Label>
      <Space direction="vertical">
        <AntdDatePicker
          onChange={handleDateChange}
          id={uniqueId}
          name="date"
          format="DD/MM/YYYY"
          role="input"
          aria-label="date-picker"
          size="small"
          prevIcon={
            <ArrowCircled direction="left" className="text-black h-4 w-4" />
          }
          nextIcon={
            <ArrowCircled direction="right" className="text-black h-4 w-4" />
          }
          disabledDate={(date) => date.isBefore(dayjs().add(-1, "day"))}
          popupClassName="customDatePicker"
          className={error ? "border-red-500" : ""}
          value={dayjs(value, "DD/MM/YYYY")}
        />
      </Space>
      <ErrorMessage showError={error}>Select a valid date</ErrorMessage>
    </Field>
  );
}
