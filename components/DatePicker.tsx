import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";

interface Props {
  onChange: (value: Dayjs | null) => void;
  defaultValue?: Dayjs;
}

const DatePicker = ({ onChange, defaultValue }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePickerMui
          sx={{
            width: "20rem",
          }}
          onChange={(newValue) => onChange(newValue)}
          format="DD/MM/YYYY"
          label="Deadline"
          defaultValue={defaultValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
