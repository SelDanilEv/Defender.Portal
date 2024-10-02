import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import dayjs from "dayjs";

import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import LockedChipList from "src/components/LockedComponents/LockedChipList/LockedChipList";
import LockedSelect from "src/components/LockedComponents/LockedSelect/LockedSelect";
import LockedTextField from "src/components/LockedComponents/LockedTextField/LockedTextField";
import { BudgetTrackerAvailableCurrencies } from "src/models/shared/Currency";
import { DialogMode } from "src/models/shared/DialogMode";
import {
  BudgetReview,
  BudgetReviewedPosition,
} from "src/models/budgetTracker/BudgetReview";
import "src/helpers/dateExtensions";
import LockedDatePicker from "src/components/LockedComponents/LockedDatePicker/LockedDatePicker";
import { GetEntities } from "src/customTypes";
import WarningStatusLabel from "src/components/Label/StatusLabels/Warning";
import { CurrencyAmountMaskRegex } from "src/consts/Regexes";

import { PublishReview, DeleteReview } from "./actions";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} py={1}>
      <Divider />
    </Grid>
  );
};
const GapGrid = () => {
  return <Grid item xs={12} py={0.5}></Grid>;
};

const gridItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as any;

interface ReviewDialogBodyProps {
  dialogMode: DialogMode;
  inputModel: BudgetReview;
  closeDialog: () => void;
}

const ReviewDialogBody = (props: ReviewDialogBodyProps) => {
  const u = useUtils();

  const { dialogMode, inputModel, closeDialog } = props;

  const [model, setModel] = useState<BudgetReview>(
    inputModel || ({} as BudgetReview)
  );

  const isModelValid = model && model.positions?.length > 0;

  useEffect(() => {
    setModel(inputModel);
  }, [inputModel]);

  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  if (dialogMode === DialogMode.Hide || !inputModel) return <></>;

  const updateDate = (date: Date) => {
    setModel((prevState) => {
      const formattedDate = date.toDateOnlyString();

      return { ...prevState, date: formattedDate as any };
    });
  };

  const onChipsChange = (index, tags: string[]) => {
    handleUpdatePosition(index, "tags", tags);
  };

  const handleUpdatePosition = (index, field, value) => {
    const updatedPositions = model.positions.map((position, i) =>
      i === index ? { ...position, [field]: value } : position
    );
    setModel({ ...model, positions: updatedPositions });
  };

  const handleDeletePosition = (index) => {
    const updatedPositions = model.positions.filter((_, i) => i !== index);
    setModel({ ...model, positions: updatedPositions });
  };

  const renderPositions = () => {
    return model.positions?.map((position, index) => (
      <Grid item xs={12} container key={index}>
        <Grid item xs={12} sm={12}>
          <LockedTextField
            fullWidth
            disabled={dialogMode === DialogMode.Delete || !isAdvancedMode}
            label={u.t("budgetTracker:positions_table_name_column")}
            onChange={(e) =>
              handleUpdatePosition(index, "name", e.target.value)
            }
            value={position.name}
            variant="standard"
          />
        </Grid>

        <GapGrid />

        <Grid item xs={9} sm={9}>
          <LockedTextField
            disabled={dialogMode === DialogMode.Delete}
            label={u.t("budgetTracker:review_dialog_position_amount_label")}
            value={position.amount / 100}
            onChange={(e) => {
              if (CurrencyAmountMaskRegex.test(e.target.value)) {
                handleUpdatePosition(
                  index,
                  "amount",
                  Math.round(+e.target.value * 100)
                );
              }
            }}
            variant="standard"
            type="number"
          />
        </Grid>

        <Grid item xs={3} sm={3} style={gridItem}>
          <LockedSelect
            disabled={dialogMode === DialogMode.Delete || !isAdvancedMode}
            value={position.currency}
            onChange={(e) =>
              handleUpdatePosition(index, "currency", e.target.value)
            }
          >
            {BudgetTrackerAvailableCurrencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </LockedSelect>
        </Grid>

        {isAdvancedMode && (
          <>
            <GapGrid />

            <Grid item xs={10} sm={10}>
              <LockedChipList
                disabled={dialogMode === DialogMode.Delete}
                sx={{ minWidth: "100px", width: "25%" }}
                label={u.t("budgetTracker:positions_dialog_tags_label")}
                variant="standard"
                initialChips={position.tags}
                onChange={(tags) => onChipsChange(index, tags)}
              />
            </Grid>

            <Grid item xs={2} sm={2} style={gridItem}>
              <Tooltip title={u.t("double_click_tooltip")}>
                <LockedButton
                  color="error"
                  disabled={dialogMode === DialogMode.Delete}
                  onDoubleClick={() => {
                    handleDeletePosition(index);
                  }}
                  variant="outlined"
                >
                  {u.t("X")}
                </LockedButton>
              </Tooltip>
            </Grid>
          </>
        )}

        {HorizontalDivider()}
      </Grid>
    ));
  };

  const renderActionButton = () => {
    switch (dialogMode) {
      case DialogMode.Update:
        return (
          <LockedButton
            fullWidth={u.isMobile}
            disabled={!isModelValid}
            onClick={() => {
              PublishReview(model, u, closeDialog);
            }}
            variant="outlined"
          >
            {u.t("Publish")}
          </LockedButton>
        );
      case DialogMode.Delete:
        return (
          <LockedButton
            color="error"
            fullWidth={u.isMobile}
            onClick={() => {
              DeleteReview(model, u, closeDialog);
            }}
            variant="outlined"
          >
            {u.t("Delete")}
          </LockedButton>
        );
    }

    return <></>;
  };

  return (
    <Grid
      container
      spacing={2}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      {model && (
        <>
          <Grid item xs={7} sm={7} style={gridItem}>
            <LockedDatePicker
              disabled={dialogMode === DialogMode.Delete}
              label={u.t("budgetTracker:reviews_table_date_column")}
              value={new Date(model.date) || dayjs().toDate()}
              onChange={updateDate}
              maxDate={dayjs().toDate()}
            />
          </Grid>

          <Grid item xs={5} sm={5} style={gridItem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdvancedMode}
                  onChange={(e) => setIsAdvancedMode(e.target.checked)}
                />
              }
              labelPlacement="end"
              label={u.t("budgetTracker:reviews_dialog_advanced_mode_label")}
            />
          </Grid>

          <Grid item xs={12}>
            {HorizontalDivider()}
          </Grid>

          <Grid item container xs={12}>
            {renderPositions()}
            {isAdvancedMode && (
              <>
                <Grid item xs={12} style={gridItem}>
                  <LockedButton
                    disabled={dialogMode === DialogMode.Delete}
                    color="success"
                    fullWidth={u.isMobile}
                    onClick={() => {
                      setModel((prevState) => {
                        return {
                          ...prevState,
                          positions: [
                            ...prevState.positions,
                            {
                              name: "",
                              amount: 0,
                              currency: model.baseCurrency,
                              tags: [],
                              orderPriority: 0,
                            } as BudgetReviewedPosition,
                          ],
                        };
                      });
                    }}
                    variant="outlined"
                  >
                    {u.t("budgetTracker:reviews_dialog_add_position_button")}
                  </LockedButton>
                </Grid>

                <Grid item xs={12}>
                  {HorizontalDivider()}
                </Grid>
              </>
            )}
          </Grid>

          <Grid item container spacing={1}>
            <Grid item xs={12} style={gridItem}>
              <Typography variant="h6" gutterBottom>
                {u.t("budgetTracker:reviews_dialog_rates_to_label")}
                {model.baseCurrency}
              </Typography>
            </Grid>
            {inputModel.date !== model.date && (
              <Grid item xs={12} style={gridItem}>
                <WarningStatusLabel>
                  {u.t("budgetTracker:reviews_dialog_not_valid_rates_label")}
                  {inputModel.date &&
                    format(new Date(inputModel.date), "MM.dd.yyyy")}
                </WarningStatusLabel>
              </Grid>
            )}
            {GetEntities(model.rates)
              .filter(([currency]) => currency !== model.baseCurrency)
              .map(([currency, rate]) => (
                <Grid item xs={12} sm={6} md={4} key={currency}>
                  <Paper style={{ padding: "16px" }}>
                    <Typography variant="body1">
                      {currency}: {rate.toFixed(4)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Grid item xs={12}>
            {HorizontalDivider()}
          </Grid>

          <Grid item xs={12} sm={12} style={gridItem}>
            {renderActionButton()}
          </Grid>
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(ReviewDialogBody);
