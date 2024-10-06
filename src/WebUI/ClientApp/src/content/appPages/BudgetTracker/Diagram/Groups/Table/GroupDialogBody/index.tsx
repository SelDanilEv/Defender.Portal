import { Divider, Grid, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ColorPicker } from "material-ui-color";

import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import LockedChipList from "src/components/LockedComponents/LockedChipList/LockedChipList";
import LockedTextField from "src/components/LockedComponents/LockedTextField/LockedTextField";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import LockedCheckbox from "src/components/LockedComponents/LockedCheckbox/LockedCheckbox";
import { DialogMode } from "src/models/shared/DialogMode";

import { CreateGroup, DeleteGroup, UpdateGroup } from "./actions";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} style={{ paddingTop: 5 }}>
      <Divider />
    </Grid>
  );
};

const gridItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as any;

interface GroupDialogBodyProps {
  dialogMode: DialogMode;
  inputModel: BudgetDiagramGroup;
  closeDialog: () => void;
}

const GroupDialogBody = (props: GroupDialogBodyProps) => {
  const u = useUtils();

  const { dialogMode, inputModel, closeDialog } = props;

  const [model, setModel] = useState<BudgetDiagramGroup>(
    inputModel || ({} as BudgetDiagramGroup)
  );

  const isModelValid = model && model.name;

  useEffect(() => {
    setModel(inputModel);
  }, [inputModel]);

  const onChipsChange = (tags: string[]) => {
    setModel((group) => {
      return { ...group, tags: tags };
    });
  };

  if (dialogMode === DialogMode.Hide || !inputModel) return <></>;

  const modelParams = ParamsObjectBuilder.Build(u, model);

  const handleUpdateModel = (event) => {
    const { name, type } = event.target;
    let value = type === "checkbox" ? event.target.checked : event.target.value;

    setModel((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const renderActionButton = () => {
    switch (dialogMode) {
      case DialogMode.Create:
        return (
          <LockedButton
            fullWidth={u.isMobile}
            disabled={!isModelValid}
            onClick={() => {
              CreateGroup(model, u, closeDialog);
            }}
            variant="outlined"
          >
            {u.t("Create")}
          </LockedButton>
        );
      case DialogMode.Update:
        return (
          <LockedButton
            fullWidth={u.isMobile}
            disabled={!isModelValid}
            onClick={() => {
              UpdateGroup(model, u, closeDialog);
            }}
            variant="outlined"
          >
            {u.t("Update")}
          </LockedButton>
        );
      case DialogMode.Delete:
        return (
          <LockedButton
            color="error"
            fullWidth={u.isMobile}
            onClick={() => {
              DeleteGroup(model, u, closeDialog);
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
          <Grid item xs={12} sm={12} style={gridItem}>
            <LockedTextField
              fullWidth
              disabled={dialogMode === DialogMode.Delete}
              label={u.t("budgetTracker:groups_table_name_column")}
              name={modelParams.name}
              value={model.name}
              onChange={handleUpdateModel}
              variant="standard"
            />
          </Grid>

          <Grid item xs={6} sm={3} style={gridItem}>
            {u.t("budgetTracker:groups_dialog_color_label")}
          </Grid>
          <Grid item xs={6} sm={3} style={gridItem}>
            <ColorPicker
              hideTextfield
              value={model.mainColor}
              disableTextfield
              disableAlpha
              deferred={true}
              onChange={(event) => {
                setModel((model) => {
                  return { ...model, mainColor: event.css.backgroundColor };
                });
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3} style={gridItem}>
            {u.t("budgetTracker:groups_dialog_trend_line_label")}
          </Grid>
          <Grid item xs={6} sm={3} style={gridItem}>
            <LockedCheckbox
              disabled={dialogMode === DialogMode.Delete}
              checked={model.showTrendLine}
              onChange={(e) => {
                setModel((model) => {
                  return { ...model, showTrendLine: !model.showTrendLine };
                });
              }}
            />
            <ColorPicker
              disablePlainColor={true}
              hideTextfield
              value={model.trendLineColor}
              disableTextfield
              disableAlpha
              deferred={true}
              onChange={(newColor) => {
                setModel((model) => {
                  return {
                    ...model,
                    trendLineColor: newColor.css.backgroundColor,
                  };
                });
              }}
            />
          </Grid>
          {HorizontalDivider()}

          <Grid item xs={12} sm={12}>
            <LockedChipList
              disabled={dialogMode === DialogMode.Delete}
              sx={{ minWidth: "100px", width: "30%" }}
              label={u.t("budgetTracker:groups_dialog_tags_label")}
              variant="standard"
              initialChips={inputModel.tags}
              onChange={onChipsChange}
            />
          </Grid>

          {HorizontalDivider()}

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

export default connect(mapStateToProps)(GroupDialogBody);
