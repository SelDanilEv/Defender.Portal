import { ListSubheader, alpha, Box, List, styled } from "@mui/material";
import { connect } from "react-redux";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

import MenuItem from "./MenuItem";
import useUtils from "src/appUtils";
import Role from "src/consts/Role";
import UserService from "src/services/UserService";

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const RoleBasedMenu = (props: any) => {
  const u = useUtils();

  const RenderMenu = () => {
    let result = [];

    switch (props.role) {
      case Role.SuperAdmin:
        result.push(
          <List
            key={"superadmin"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_super_admin")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/configuration"
                  icon={<AdminPanelSettingsIcon />}
                  text={u.t("sidebar_menu:page_configuration")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
      case Role.Admin:
        result.push(
          <List
            key={"admin"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_admin")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/admin/users"
                  icon={<TableChartTwoToneIcon />}
                  text={u.t("sidebar_menu:page_users")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
      default:
        result.push(
          <List
            key={"user"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_home")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/home"
                  icon={<HomeIcon style={{ fontSize: "1.5em" }} />}
                  text={u.t("sidebar_menu:page_home")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
        result.push(
          <List
            key={"banking"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_banking")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/banking"
                  icon={<AccountBalanceIcon style={{ fontSize: "1.5em" }} />}
                  text={u.t("sidebar_menu:page_banking")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
        result.push(
          <List
            key={"games.lottery"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_games")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/games/lottery"
                  icon={<LocalActivityIcon style={{ fontSize: "1.5em" }} />}
                  text={u.t("sidebar_menu:page_lottery")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
        result.push(
          <List
            key={"budget_tracker"}
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                {u.t("sidebar_menu:header_budget_tracker")}
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <MenuItem
                  to="/budget-tracker"
                  icon={<LocalActivityIcon style={{ fontSize: "1.5em" }} />}
                  text={u.t("sidebar_menu:page_budget_tracker")}
                />
              </List>
            </SubMenuWrapper>
          </List>
        );
        break;
    }

    return result;
  };

  return <>{RenderMenu()}</>;
};

const mapStateToProps = (state: any) => {
  return {
    role: UserService.GetHighestRole(state.session?.user?.roles),
  };
};

export default connect(mapStateToProps)(RoleBasedMenu);
