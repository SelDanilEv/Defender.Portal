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

import { CurrentPagination } from "src/models/base/CurrentPagination";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";

import CustomDialog from "src/components/Dialog";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import {
  BudgetReview,
  BudgetReviewedPosition,
} from "src/models/budgetTracker/BudgetReview";
import { DialogMode, OpenDialog } from "src/models/shared/DialogMode";

import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LockedIconButton from "src/components/LockedComponents/LockedIconButtons/LockedIconButton";
import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import { Dictionary, GetEntities } from "src/customTypes";
import { format } from "date-fns";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import ReviewDialogBody from "./ReviewDialogBody";

interface ReviewsTableProps {
  reviews: BudgetReview[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
}

const calculateTotalsByCurrency = (
  positions: BudgetReviewedPosition[]
): Dictionary<string, number> => {
  const sums = positions.reduce(
    (acc: Dictionary<string, number>, position: BudgetReviewedPosition) => {
      const { currency, amount } = position;
      if (!acc[currency]) {
        acc[currency] = 0;
      }
      acc[currency] += amount;
      return acc;
    },
    {}
  );
  return sums;
};

const renderCurrencyChips = (positions: BudgetReviewedPosition[]) => {
  const totals = calculateTotalsByCurrency(positions);
  return GetEntities(totals).map(([currency, sum]) => (
    <Chip
      key={currency}
      label={`${sum} ${CurrencySymbolsMap[currency]}`}
      style={{ margin: "0 4px" }}
    />
  ));
};

const ReviewsTable = (props: ReviewsTableProps) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    reviews: reviews,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
  } = props;

  const [tablePagination, setTablePagination] = useState<PaginationRequest>({
    page: 0,
    pageSize: 10,
  });

  const [reviewToUpdate, setModelToUpdate] = useState<BudgetReview>();
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

  const setReviewTemplateAndShowDialog = () => {
    const url = `${apiUrls.budgetTracker.getReviewTemplate}`;

    let review: BudgetReview = undefined;

    APICallWrapper({
      url: url,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        review = await response.json();

        setModelToUpdate(review);
        setDialogMode(DialogMode.Update);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  const renderRowInfo = (model: BudgetReview): JSX.Element => {
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
              {model.date && format(new Date(model.date), "MM.dd.yyyy")}
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
              {renderCurrencyChips(model.positions)}
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
                {model.positions.length}
              </Typography>
            </TableCell>
          )}
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
              onClick={setReviewTemplateAndShowDialog}
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
            {u.t("budgetTracker:reviews_table_title")}
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
                {u.t("budgetTracker:reviews_table_date_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("budgetTracker:reviews_table_total_column")}
              </TableCell>
              {u.isMobile ? null : (
                <TableCell align="center">
                  {u.t("budgetTracker:reviews_table_positions_count_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{reviews.map(renderRowInfo)}</TableBody>
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
        title={u.t("budgetTracker:reviews_dialog_title")}
        open={OpenDialog(dialogMode)}
        onClose={() => {
          setDialogMode(DialogMode.Hide);
          setModelToUpdate({} as BudgetReview);
        }}
        children={
          <ReviewDialogBody
            closeDialog={() => {
              setDialogMode(DialogMode.Hide);
              refresh();
            }}
            inputModel={reviewToUpdate}
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

export default connect(mapStateToProps)(ReviewsTable);
