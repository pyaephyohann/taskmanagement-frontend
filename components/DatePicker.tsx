import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";

interface Props {
  onChange: (value: Dayjs | null) => void;
  defaultValue?: Dayjs;
  width?: string;
  label: string;
}

const DatePicker = ({ onChange, defaultValue, width, label }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePickerMui
          sx={{
            width: width ? width : "20rem",
          }}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          format="DD/MM/YYYY"
          label={label}
          defaultValue={defaultValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
