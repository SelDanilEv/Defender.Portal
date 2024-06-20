import { Button, ButtonProps, styled } from "@mui/material";
import { useEffect, useState } from "react";

import CheckBoxButtonProps from "./CheckBoxButtonProps";

interface StyledButtonProps extends ButtonProps {
  selected?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>(
  ({ theme, selected }) => ({
    border: selected ? "1px solid lightgray" : "1px solid",
    boxShadow: selected ? "0px 0px 15px 2px rgba(26,108,249,0.8)" : "none",
    transform: selected ? "translateY(-1px)" : "none",
    transition: "all 0.3s ease",
    perspective: selected ? "600px" : "none",
    color: selected ? theme.colors.gradients.black1 : theme.colors.primary.main,
    backgroundColor: selected
      ? theme.colors.primary.lighter
      : theme.colors.primary.lighter,
  })
);

const CheckBoxButton = ({
  text,
  isChecked = false,
  onCheck = () => {},
  onUncheck = () => {},
  ...props
}: CheckBoxButtonProps) => {
  const [selected, setSelected] = useState(isChecked);

  useEffect(() => {
    setSelected(isChecked);
  }, [isChecked]);

  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
    var isSelected = !selected;

    if (isSelected) {
      if (onCheck) {
        onCheck();
      }
    } else {
      if (onUncheck) {
        onUncheck();
      }
    }

    setSelected(isSelected);
  };

  props.variant = selected ? "contained" : "outlined";

  return (
    <StyledButton {...props} onClick={handleClick} selected={selected}>
      {text}
    </StyledButton>
  );
};

export default CheckBoxButton;
