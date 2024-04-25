import { Box, Typography } from "@mui/material";

import useUtils from "src/appUtils";

const RechargeOrRefundDialogBody = (props: any) => {
  const u = useUtils();

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h6" style={{ marginLeft: "0.5em" }}>
        {u.t("banking_page__wallet_dialog_recharge_or_refund_info_1")}
        <p>{u.t("banking_page__wallet_dialog_recharge_or_refund_info_2")}</p>
      </Typography>
    </Box>
  );
};

export default RechargeOrRefundDialogBody;
