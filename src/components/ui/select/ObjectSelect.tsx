import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { Value } from "@/interfaces/ui";

interface CustomSelectProps {
  value: Value;
  handleChange: (index: number) => void;
  defaultValue?: Value;
  values: Value[];
  color?: string;
  header?: string;
  width?: number;
}
export default function CustomSelect({
  value,
  defaultValue,
  handleChange,
  values,
  color = "#fff",
  header,
  width = 200,
}: CustomSelectProps) {
  return (
    <>
      <InputLabel>{header}</InputLabel>
      <Select
        style={{
          textTransform: "capitalize",
          width,
          fontSize: 20,
          color: color,
        }}
        value={value.title}
      >
        {defaultValue && (
          <MenuItem onClick={() => handleChange(-1)} value={defaultValue.title}>
            {defaultValue.title}
          </MenuItem>
        )}
        {values.map((val: Value, index: number) => (
          <MenuItem
            key={index}
            value={val.title}
            onClick={() => handleChange(index)}
          >
            {val.title}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
