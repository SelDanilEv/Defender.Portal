import { connect } from "react-redux";

import LockedTextField from "../LockedTextField/LockedTextField";
import LockedChipListProps from "./LockedChipListProps";
import { Chip } from "@mui/material";
import { useState, useEffect } from "react";

const LockedChipList = ({
  isLoading,
  dispatch,
  initialChips: chips,
  onChange,
  ...restProps
}: LockedChipListProps) => {
  const [chipData, setChipData] = useState<string[]>(chips);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!chipData.includes(inputValue.trim())) {
        setChipData([...chipData, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (chipToDelete: string) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  useEffect(() => {
    if (onChange) onChange(chipData);
  }, [chipData]);

  const { value, onKeyDown, disabled, ...textFieldProps } = restProps;

  return (
    <>
      <LockedTextField
        {...(textFieldProps as any)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading || disabled}
      />
      {chipData.map((chip, index) => (
        <Chip
          disabled={isLoading || disabled}
          key={index}
          label={chip}
          onDelete={handleDelete(chip)}
          sx={{ m: 0.5 }}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedChipList);
