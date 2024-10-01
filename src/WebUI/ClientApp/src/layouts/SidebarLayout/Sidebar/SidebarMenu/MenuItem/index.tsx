import { Button, ListItem } from "@mui/material";
import { useContext } from "react";
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "src/contexts/SidebarContext";

const MenuItem = (props: any) => {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <ListItem>
      <Button
        disableRipple
        disabled={props.isLoading}
        component={RouterLink}
        onClick={closeSidebar}
        to={props.to}
        startIcon={props.icon}
        sx={{ fontSize: "1.6em" }}
      >
        {props.text}
      </Button>
    </ListItem>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(MenuItem);
