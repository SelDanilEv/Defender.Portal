import { Button, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { connect } from "react-redux";

import { ExpandMoreTwoTone as ExpandMoreTwoToneIcon } from "@mui/icons-material"

import LockedSelectProps from "./LockedSelectProps";

import { KeyValue } from "src/models/key_value";


const LockedSelect = ({ isLoading, options, onSelect, defaultKey }: LockedSelectProps) => {
  const actionRef1 = useRef<any>(null);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [option, setOption] = useState<KeyValue>(
    defaultKey
      ? options.filter(x => x.key === defaultKey)[0] || options[0]
      : options[0]);

  return <>
    <Button
      disabled={isLoading}
      size="small"
      variant="outlined"
      ref={actionRef1}
      onClick={() => setOpenSelect(true)}
      endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
    >
      {option.value}
    </Button>
    <Menu
      disableScrollLock
      anchorEl={actionRef1.current}
      onClose={() => setOpenSelect(false)}
      open={openSelect}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.key}
          onClick={() => {
            setOption(option);
            setOpenSelect(false);
            onSelect(option);
          }}
        >
          {option.value}
        </MenuItem>
      ))}
    </Menu>
  </>
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading
  };
};

export default
  connect(mapStateToProps)
    (LockedSelect);
