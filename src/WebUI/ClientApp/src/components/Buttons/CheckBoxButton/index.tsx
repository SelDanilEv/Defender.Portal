import { Button, ButtonProps, styled } from "@mui/material";
import { useState } from "react";

import CustomButtonProps from "../Interface";

interface StyledButtonProps extends ButtonProps {
  selected?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>(
  ({ theme, selected }) => ({
    border: selected ? "1px solid lightgray" : "1px solid",
    boxShadow: selected ? "0px 0px 15px 2px rgba(50,225,50,0.5)" : "none",
    transform: selected ? "translateY(-1px)" : "none",
    transition: "all 0.3s ease",
    perspective: selected ? "600px" : "none",
    color: selected ? theme.colors.gradients.black1 : theme.colors.primary.main,
    backgroundColor: selected
      ? theme.colors.primary.lighter
      : theme.colors.primary.lighter,
  })
);

const CheckBoxButton = ({ text, ...props }: CustomButtonProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  props.variant = selected ? "contained" : "outlined";

  return (
    <StyledButton {...props} onClick={handleClick} selected={selected}>
      {text}
    </StyledButton>
  );
};

export default CheckBoxButton;
