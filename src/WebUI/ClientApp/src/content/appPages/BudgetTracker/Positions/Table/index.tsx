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
  Chip,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import CachedIcon from "@mui/icons-material/Cached";
import CustomDialog from "src/components/Dialog";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";
import { DialogMode, OpenDialog } from "src/models/shared/DialogMode";
import PositionDialogBody from "./PositionDialogBody";

interface PositionsTableProps {
  positions: BudgetPosition[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
}

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
    pageSize: 5,
  });

  const [positionToUpdate, setPositionToUpdate] = useState<BudgetPosition>();
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

  const renderPositionRowInfo = (position: BudgetPosition): JSX.Element => {
    {
      return (
        <TableRow hover key={position.id}>
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {position.name}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              {generateTags(position.tags)}
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
              {position.currency}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <IconButton
              sx={{
                "&:hover": { background: theme.colors.info.lighter },
                color: theme.palette.info.dark,
              }}
              onClick={(event) => {
                event.stopPropagation();
                setPositionToUpdate(position);
                setDialogMode(DialogMode.Info);
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
              <TableCell align="center">
                {u.t("budgetTracker:positions_table_tags_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("budgetTracker:positions_table_currency_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{positions.map(renderPositionRowInfo)}</TableBody>
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
        title={u.t("budgetTracker:positions_dialog_title")}
        open={OpenDialog(dialogMode)}
        onClose={() => setDialogMode(DialogMode.Hide)}
        children={
          <PositionDialogBody
            closeDialog={() => setDialogMode(DialogMode.Hide)}
            position={positionToUpdate}
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
