import { Grid, Container } from "@mui/material";
import HistoricalTransactions from "../../Shared/HistoricalTransactions";

const TransactionHistory = (props: any) => {
  return (
    <>
      <Container
        sx={{ mt: "3px", px: "0px", "@media (min-width:600px)": { px: "0px" } }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <HistoricalTransactions />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TransactionHistory;
