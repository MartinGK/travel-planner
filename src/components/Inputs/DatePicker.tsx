import type { DatePickerProps } from "antd";
import { DatePicker as AntdDatePicker, Space } from "antd";

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

type Props = {};

export default function DatePicker({}: Props) {
  return (
    <div role="input" aria-label="date-picker">
      <Space direction="vertical">
        <AntdDatePicker onChange={onChange} />
      </Space>
    </div>
  );
}
