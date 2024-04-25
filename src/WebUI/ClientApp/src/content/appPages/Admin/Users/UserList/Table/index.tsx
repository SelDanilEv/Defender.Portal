import { ChangeEvent, useEffect, useState } from "react";
import {
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import CachedIcon from "@mui/icons-material/Cached";
import { UserOnlyInfo } from "src/models/UserOnlyInfo";
import CustomDialog from "src/components/Dialog";
import UserInfoDialogBody from "./UserInfoDialogBody";
import { PaginationRequest } from "src/models/base/PaginationRequest";

interface UserListTableProps {
  users: UserOnlyInfo[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
  selectUser: (userId: string) => void;
}

const UserListTable = (props: UserListTableProps) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    users: users,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
    selectUser: selectUser,
  } = props;

  const [tablePagination, setTablePagination] = useState<PaginationRequest>({
    page: 0,
    pageSize: 5,
  });
  const [userForDetails, setUserForDetails] = useState<UserOnlyInfo>();
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);

  useEffect(() => {
    applyPagination(tablePagination.page, tablePagination.pageSize);
  }, [tablePagination]);

  const handlePageChange = (event: any, newPage: number): void => {
    setTablePagination({ ...tablePagination, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTablePagination({ page: 0, pageSize: parseInt(event.target.value) });
  };

  const renderUserInfo = (userInfo: UserOnlyInfo): JSX.Element => {
    {
      return (
        <TableRow
          hover
          key={userInfo.id}
          onClick={() => selectUser(userInfo.id)}
        >
          {!u.isMobile && (
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {userInfo.id}
              </Typography>
            </TableCell>
          )}
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {userInfo.email}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {userInfo.nickname}
            </Typography>
          </TableCell>
          {!u.isMobile && (
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {userInfo.phoneNumber}
              </Typography>
            </TableCell>
          )}
          <TableCell align="center">
            <IconButton
              sx={{
                "&:hover": { background: theme.colors.info.lighter },
                color: theme.palette.info.dark,
              }}
              onClick={() => {
                setUserForDetails(userInfo);
                setShowInfoDialog(true);
              }}
              color="inherit"
              size="small"
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Card>
      <CardHeader
        action={
          <LockedButton sx={{ mr: "1em" }} variant="outlined" onClick={refresh}>
            <CachedIcon />
          </LockedButton>
        }
        title={
          <Typography fontSize={"1.7em"} fontWeight="bold">
            {u.t("admin_users_page__user_table_title")}
          </Typography>
        }
        titleTypographyProps={{
          style: { fontSize: u.isMobile ? "1.5em" : "2em" },
        }}
      />
      <Divider />
      <TableContainer
        sx={{
          fontSize: u.isMobile ? "0.9em" : "1.5em",
          "& .MuiTableCell-root": {
            fontSize: u.isMobile ? "0.8em" : "0.8em",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {!u.isMobile && (
                <TableCell align="center">
                  {u.t("admin_users_page__user_table_id_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("admin_users_page__user_table_email_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("admin_users_page__user_table_nickname_column")}
              </TableCell>
              {!u.isMobile && (
                <TableCell align="center">
                  {u.t("admin_users_page__user_table_phone_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("admin_users_page__user_table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{users.map(renderUserInfo)}</TableBody>
        </Table>
      </TableContainer>
      <Box
        p={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: u.isMobile ? "0.6em" : "1em",
          }}
        >
          {u.t("table_rows_per_page_label")}
        </Typography>
        <TablePagination
          component="div"
          count={pagination.totalItemsCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={tablePagination.page}
          rowsPerPage={tablePagination.pageSize}
          rowsPerPageOptions={[5, 20, 50, 100]}
          labelRowsPerPage=""
        />
      </Box>
      <CustomDialog
        title={u.t("admin_users_page__user_info_dialog_title")}
        open={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
        children={
          <UserInfoDialogBody
            isDialogOpen={showInfoDialog}
            closeDialog={() => setShowInfoDialog(false)}
            user={userForDetails}
          />
        }
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
    walletNumber: state.wallet.walletNumber,
  };
};

export default connect(mapStateToProps)(UserListTable);
