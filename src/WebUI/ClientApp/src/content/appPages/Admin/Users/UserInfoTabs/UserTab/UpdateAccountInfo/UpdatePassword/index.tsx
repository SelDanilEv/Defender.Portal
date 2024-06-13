import { Grid, TextField } from "@mui/material";

import useUtils from "src/appUtils";
import { useEffect, useState } from "react";

import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import apiUrls from "src/api/apiUrls";
import { AdminUpdatePasswordRequest } from "src/models/requests/admin/updateUser/AdminUpdatePasswordRequest";
import { PasswordMaskRegex, PasswordRegex } from "src/consts/Regexes";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";

interface UpdatePasswordProps {
  userId: string;
}

const UpdatePassword = (props: UpdatePasswordProps) => {
  const u = useUtils();

  const [updateRequest, setUpdateRequest] =
    useState<AdminUpdatePasswordRequest>({
      userId: props.userId,
      newPassword: "",
    });

  const updateParams = ParamsObjectBuilder.Build(u, updateRequest);

  const [isUpdateAllowed, setIsUpdateAllowed] = useState<boolean>(false);

  useEffect(() => {
    setIsUpdateAllowed(
      updateRequest &&
        updateRequest.newPassword &&
        PasswordRegex.test(updateRequest.newPassword)
    );
  }, [updateRequest]);

  const handleUpdatePasswordField = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    setUpdateRequest((prevState) => {
      if (
        name === updateParams.newPassword &&
        value !== "" &&
        !PasswordMaskRegex.test(value)
      ) {
        return prevState;
      }

      return { ...prevState, [name]: value };
    });
  };

  const handleUpdate = () => {
    if (!isUpdateAllowed) return;

    APICallWrapper({
      url: apiUrls.admin.updateAccountPassword,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestParamsBuilder.BuildBody(updateRequest),
      },
      utils: u,
      showSuccess: true,
      onSuccess: async (response) => {
        setUpdateRequest((prevState) => {
          return { ...prevState, newPassword: "" };
        });
      },
      onFinal: async () => {},
    });
  };

  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          type="password"
          name={updateParams.newPassword}
          label={u.t(
            "admin_users_page__info_user_tab_account_info_new_password_label"
          )}
          InputProps={{ style: { fontSize: "1.5em" } }}
          value={updateRequest.newPassword}
          onChange={handleUpdatePasswordField}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LockedButton
          disabled={!isUpdateAllowed}
          onClick={handleUpdate}
          variant="outlined"
          fullWidth
          sx={{ height: { xs: "55px", sm: "100%" } }}
        >
          {u.t(
            "admin_users_page__info_user_tab_account_info_update_password_button"
          )}
        </LockedButton>
      </Grid>
    </>
  );
};

export default UpdatePassword;
