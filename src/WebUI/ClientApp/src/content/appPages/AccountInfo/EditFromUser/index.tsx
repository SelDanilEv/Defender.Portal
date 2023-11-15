import {
  Typography,
  Grid,
  CardContent,
  TextField,
  Divider,
} from "@mui/material";
import useUtils from "src/appUtils";

import Text from "src/components/Text";

const EditFromAdmin = (props: any) => {
  const u = useUtils();

  let user = props.user;

  const UpdateUser = (event) => {
    user[event.target.id] = event.target.value;
    props.updateUser(user);
  };

  return (
    <>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              alignContent={"center"}
              justifyContent={{ xs: "left", sm: "center" }}
            >
              <Grid>{u.t("personal_ingo_page_name_field")}:</Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <TextField
                id="name"
                sx={{ padding: 0 }}
                defaultValue={user.name}
                onChange={UpdateUser}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} pt={1} pb={1}>
              <Divider />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              alignContent={"center"}
              justifyContent={{ xs: "left", sm: "center" }}
            >
              <Grid>{u.t("personal_ingo_page_email_field")}:</Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <TextField
                id="email"
                sx={{ padding: 0 }}
                defaultValue={user.email}
                onChange={UpdateUser}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} pt={1} pb={1}>
              <Divider />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              alignContent={"center"}
              justifyContent={{ xs: "left", sm: "center" }}
            >
              <Grid>{u.t("personal_ingo_page_created_date_field")}:</Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">{user.createdDate}</Text>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </>
  );
};

export default EditFromAdmin;
