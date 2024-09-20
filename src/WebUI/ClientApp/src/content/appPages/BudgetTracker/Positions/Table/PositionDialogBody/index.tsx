import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import LockedTextField from "src/components/LockedComponents/LockedTextField/LockedTextField";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";
import { DialogMode } from "src/models/shared/DialogMode";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} style={{ paddingTop: 0 }}>
      <Divider />
    </Grid>
  );
};

interface PositionDialogBodyProps {
  dialogMode: DialogMode;
  position: BudgetPosition;
  closeDialog: () => void;
}

const PositionDialogBody = (props: PositionDialogBodyProps) => {
  const u = useUtils();

  const { dialogMode, position } = props;

  const [model, setModel] = useState<BudgetPosition>(position);

  useEffect(() => {
    setModel(position);
  }, [position]);

  if (dialogMode === DialogMode.Hide || !position) return <></>;

  const modelParams = ParamsObjectBuilder.Build(u, model);

  const handleUpdateModel = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    setModel((prevState) => {
      // if (name === modelParams.name && value !== "") {
      //   return prevState;
      // }

      return { ...prevState, [name]: value };
    });
  };

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      {model && (
        <>
          <Grid
            item
            xs={6}
            sm={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {u.t("budgetTracker:positions_table_name_column")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            <LockedTextField
              name={modelParams.name}
              value={model.name}
              onChange={handleUpdateModel}
              variant="standard"
            />
          </Grid>

          {HorizontalDivider()}
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

export default connect(mapStateToProps)(PositionDialogBody);
