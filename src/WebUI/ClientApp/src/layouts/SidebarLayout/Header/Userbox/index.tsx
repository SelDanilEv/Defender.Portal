import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

import { logout } from "src/actions/sessionActions";
import useUtils from "src/appUtils";
import UserService from "src/services/UserService";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

const HeaderUserbox = (props: any) => {
  let u = useUtils();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const user = UserService.GetUserInfoFromSession(props.session);
  const roleToDisplay = UserService.RoleToDisplay(user.Role);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const Logout = () => {
    props.logout();
    u.react.navigate("/");
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.Nickname} src={user.Avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.Nickname}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {roleToDisplay}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.Nickname} src={user.Avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.Nickname}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {roleToDisplay}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            button
            to="/account/update"
            component={NavLink}
            onClick={handleClose}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={u.t("sidebar_header_menu_profile")} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => Logout()}>
            <LockOpenTwoToneIcon fontSize="medium" />
            <ListItemText primary={u.t("sidebar_header_menu_logout")} />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserbox);
