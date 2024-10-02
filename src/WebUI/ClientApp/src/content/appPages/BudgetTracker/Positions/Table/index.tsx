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
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { connect } from "react-redux";

import { CurrentPagination } from "src/models/base/CurrentPagination";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import CustomDialog from "src/components/Dialog";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";
import { DialogMode, OpenDialog } from "src/models/shared/DialogMode";
import LockedIconButton from "src/components/LockedComponents/LockedIconButtons/LockedIconButton";
import { BudgetTrackerAvailableCurrencies } from "src/models/shared/Currency";

import PositionDialogBody from "./PositionDialogBody";

interface PositionsTableProps {
  positions: BudgetPosition[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
}

const DefaultPosition: BudgetPosition = {
  id: "",
  name: "",
  tags: [],
  currency: BudgetTrackerAvailableCurrencies[0],
  orderPriority: 0,
} as BudgetPosition;

const PositionsTable = (props: PositionsTableProps) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    positions: positions,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
  } = props;

  const [tablePagination, setTablePagination] = useState<PaginationRequest>({
    page: 0,
    pageSize: 10,
  });

  const [positionToUpdate, setModelToUpdate] = useState<BudgetPosition>();
  const [dialogMode, setDialogMode] = useState<DialogMode>(DialogMode.Hide);

  useEffect(() => {
    applyPagination(tablePagination.page, tablePagination.pageSize);
  }, [tablePagination]);

  const handlePageChange = (event: any, newPage: number): void => {
    setTablePagination({ ...tablePagination, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTablePagination({ page: 0, pageSize: parseInt(event.target.value) });
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

  const renderRowInfo = (model: BudgetPosition): JSX.Element => {
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
              {model.currency}
            </Typography>
          </TableCell>
          <TableCell align="center">
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
                setModelToUpdate(DefaultPosition);
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
            {u.t("budgetTracker:positions_table_title")}
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
                {u.t("budgetTracker:positions_table_name_column")}
              </TableCell>
              {u.isMobile ? null : (
                <TableCell align="center">
                  {u.t("budgetTracker:positions_table_tags_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("budgetTracker:positions_table_currency_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{positions.map(renderRowInfo)}</TableBody>
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
        title={u.t("budgetTracker:positions_dialog_title")}
        open={OpenDialog(dialogMode)}
        onClose={() => {
          setDialogMode(DialogMode.Hide);
          setModelToUpdate(DefaultPosition);
        }}
        children={
          <PositionDialogBody
            closeDialog={() => {
              setDialogMode(DialogMode.Hide);
              refresh();
            }}
            inputModel={positionToUpdate}
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

export default connect(mapStateToProps)(PositionsTable);
