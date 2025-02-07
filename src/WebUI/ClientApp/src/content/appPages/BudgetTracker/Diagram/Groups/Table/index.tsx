import { ChangeEvent, useEffect, useState } from "react";
import {
  Divider,
  Box,
  Card,
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
  Chip,
} from "@mui/material";
import { connect } from "react-redux";
import chroma from "chroma-js";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { CurrentPagination } from "src/models/base/CurrentPagination";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import CustomDialog from "src/components/Dialog";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { DialogMode, OpenDialog } from "src/models/shared/DialogMode";
import LockedIconButton from "src/components/LockedComponents/LockedIconButtons/LockedIconButton";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";

import GroupDialogBody from "./GroupDialogBody";
import { UpdateGroup } from "./GroupDialogBody/actions";
import DefaultTableConsts from "src/consts/DefaultTableConsts";

interface GroupsTableProps {
  groups: BudgetDiagramGroup[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
}

const DefaultGroup: BudgetDiagramGroup = {
  id: "",
  name: "",
  isActive: false,
  tags: [],
  mainColor: chroma.random().hex(),
  showTrendLine: false,
  trendLineColor: chroma.random().hex(),
} as BudgetDiagramGroup;

const GroupsTable = (props: GroupsTableProps) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    groups: groups,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
  } = props;

  const [tablePagination, setTablePagination] = useState<PaginationRequest>({
    page: DefaultTableConsts.DefaultPage,
    pageSize: DefaultTableConsts.DefaultPageSize,
  });

  const [groupToUpdate, setModelToUpdate] = useState<BudgetDiagramGroup>();
  const [dialogMode, setDialogMode] = useState<DialogMode>(DialogMode.Hide);

  useEffect(() => {
    applyPagination(tablePagination.page, tablePagination.pageSize);
  }, [tablePagination]);

  const handlePageChange = (event: any, newPage: number): void => {
    setTablePagination({ ...tablePagination, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTablePagination({
      page: DefaultTableConsts.DefaultPage,
      pageSize: parseInt(event.target.value),
    });
  };

  const generateTags = (tags: string[]): JSX.Element => {
    return (
      <>
        {tags.map((tag, index) => (
          <Chip sx={{ mx: 0.5, my: 0.2 }} key={index} label={tag} />
        ))}
      </>
    );
  };

  const renderRowInfo = (model: BudgetDiagramGroup): JSX.Element => {
    {
      return (
        <TableRow hover key={model.id}>
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {model.name}
            </Typography>
          </TableCell>
          {u.isMobile ? null : (
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
              >
                {generateTags(model.tags)}
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
              <Box
                sx={{
                  padding: "9px",
                  width: 24,
                  height: 24,
                  backgroundColor: model.mainColor,
                  borderRadius: "4px",
                  display: "inline-block",
                }}
              />
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
              {model.showTrendLine ? (
                <Box
                  sx={{
                    padding: "9px",
                    width: 24,
                    height: 24,
                    backgroundColor: model.trendLineColor,
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                />
              ) : (
                <LockedIconButton disabled color="inherit" size="small">
                  <VisibilityOffIcon fontSize="small" />
                </LockedIconButton>
              )}
            </Typography>
          </TableCell>
          <TableCell align="center">
            {model.isActive ? (
              <LockedIconButton
                sx={{
                  "&:hover": { background: theme.colors.success.light },
                  color: theme.palette.success.light,
                }}
                onClick={(event) => {
                  event.stopPropagation();

                  UpdateGroup(
                    {
                      id: model.id,
                      isActive: !model.isActive,
                    } as BudgetDiagramGroup,
                    u,
                    refresh
                  );
                }}
                color="inherit"
                size="small"
              >
                <VisibilityIcon fontSize="small" />
              </LockedIconButton>
            ) : (
              <LockedIconButton
                sx={{
                  "&:hover": { background: theme.colors.error.light },
                  color: theme.palette.error.light,
                }}
                onClick={(event) => {
                  event.stopPropagation();

                  UpdateGroup(
                    {
                      id: model.id,
                      isActive: !model.isActive,
                    } as BudgetDiagramGroup,
                    u,
                    refresh
                  );
                }}
                color="inherit"
                size="small"
              >
                <VisibilityOffIcon fontSize="small" />
              </LockedIconButton>
            )}

            <LockedIconButton
              sx={{
                "&:hover": { background: theme.colors.warning.lighter },
                color: theme.palette.warning.dark,
              }}
              onClick={(event) => {
                event.stopPropagation();
                setModelToUpdate(model);
                setDialogMode(DialogMode.Update);
              }}
              color="inherit"
              size="small"
            >
              <EditNoteIcon fontSize="small" />
            </LockedIconButton>
            <LockedIconButton
              sx={{
                "&:hover": { background: theme.colors.error.lighter },
                color: theme.palette.error.dark,
              }}
              onClick={(event) => {
                event.stopPropagation();
                setModelToUpdate(model);
                setDialogMode(DialogMode.Delete);
              }}
              color="inherit"
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </LockedIconButton>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Card>
      <CardHeader
        action={
          <>
            <LockedButton
              sx={{ mr: "1em" }}
              variant="outlined"
              color="success"
              onClick={() => {
                setModelToUpdate(DefaultGroup);
                setDialogMode(DialogMode.Create);
              }}
            >
              <AddIcon />
            </LockedButton>
            <LockedButton
              sx={{ mr: "1em" }}
              variant="outlined"
              onClick={refresh}
            >
              <CachedIcon />
            </LockedButton>
          </>
        }
        title={
          <Typography fontSize={"1.7em"} fontWeight="bold">
            {u.t("budgetTracker:groups_table_title")}
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
              <TableCell align="center">
                {u.t("budgetTracker:groups_table_name_column")}
              </TableCell>
              {u.isMobile ? null : (
                <TableCell align="center">
                  {u.t("budgetTracker:groups_table_tags_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("budgetTracker:groups_table_color_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("budgetTracker:groups_table_trend_line_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{groups.map(renderRowInfo)}</TableBody>
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
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage=""
        />
      </Box>
      <CustomDialog
        title={u.t("budgetTracker:groups_dialog_title")}
        open={OpenDialog(dialogMode)}
        onClose={() => {
          setDialogMode(DialogMode.Hide);
          setModelToUpdate(DefaultGroup);
        }}
        children={
          <GroupDialogBody
            closeDialog={() => {
              setDialogMode(DialogMode.Hide);
              refresh();
            }}
            inputModel={groupToUpdate}
            dialogMode={dialogMode}
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

export default connect(mapStateToProps)(GroupsTable);
