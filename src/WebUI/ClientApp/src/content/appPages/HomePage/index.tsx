import { connect } from "react-redux";

import useUtils from "src/appUtils";
import WalletAccountsInfo from "../Shared/WalletAccountsInfo";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import CloudUpload from "@mui/icons-material/CloudUpload";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

const HomePage = (props: any) => {
  const u = useUtils();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WalletAccountsInfo></WalletAccountsInfo>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 120 }}>
            <CardActionArea
              component="a"
              href="https://cloud.coded-by-danil.dev/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    {u.t("home:quick_menu_cloud")}
                  </Typography>
                  <CloudUpload sx={{ ml: 2 }} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 120 }}>
            <CardActionArea
              component={Link}
              to="/budget-tracker/diagram"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    {u.t("home:quick_menu_diagram")}
                  </Typography>
                  <StackedLineChartIcon sx={{ ml: 2 }} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 120 }}>
            <CardActionArea
              component={Link}
              to="/games/lottery"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    {u.t("home:quick_menu_lottery")}
                  </Typography>
                  <LocalActivityIcon sx={{ ml: 2 }} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 120 }}>
            <CardActionArea
              component="a"
              href="https://binary-option.coded-by-danil.dev/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    {u.t("home:quick_menu_binary_option")}
                  </Typography>
                  <CloudUpload sx={{ ml: 2 }} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 120 }}>
            <CardActionArea
              component="a"
              href="https://smart-note.coded-by-danil.dev/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    {u.t("home:quick_menu_smart_note")}
                  </Typography>
                  <CloudUpload sx={{ ml: 2 }} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(HomePage);
