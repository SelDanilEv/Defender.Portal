import { Grid, FormControlLabel, MenuItem, Box } from "@mui/material";

import useUtils from "src/appUtils";
import { useState } from "react";

import { UserAccountInfo } from "src/models/UserAccountInfo";
import { AdminUpdateAccountInfoRequest } from "src/models/requests/admin/updateUser/AdminUpdateAccountInfoRequest";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestBuilder from "src/api/APIWrapper/RequestBuilder";
import apiUrls from "src/api/apiUrls";
import UserService from "src/services/UserService";
import { connect } from "react-redux";
import Role from "src/consts/Role";
import LockedSelect from "src/components/LockedComponents/LockedSelect/LockedSelect";
import SpaceForSelectOptions from "src/consts/SpaceForSelectOptions";
import LockedCheckbox from "src/components/LockedComponents/LockedCheckbox/LockedCheckbox";

interface UpdateAccountInfoProps {
  accountInfo: UserAccountInfo;
  isSuperAdmin: boolean;
}

const UpdateAccount = (props: UpdateAccountInfoProps) => {
  const u = useUtils();

  const { accountInfo: accountInfo, isSuperAdmin: isSuperAdmin } = props;

  const [updateRequest, setUpdateRequest] =
    useState<AdminUpdateAccountInfoRequest>({
      userId: accountInfo.id,
      role: UserService.GetHighestRole(accountInfo.roles),
      isEmailVerified: accountInfo.isEmailVerified,
      isPhoneVerified: accountInfo.isPhoneVerified,
      isBlocked: accountInfo.isBlocked,
    });

  const updateParams = ParamsObjectBuilder.Build(u, updateRequest);

  const handleUpdate = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    var request = {
      userId: accountInfo.id,
    };

    request[name] = value;

    APICallWrapper({
      url: apiUrls.admin.updateAccountInfo,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestBuilder.BuildBody(request),
      },
      utils: u,
      showSuccess: true,
      onSuccess: async (response) => {
        var updatedAccountInfo: UserAccountInfo = await response.json();

        setUpdateRequest({
          ...updateRequest,
          role: UserService.GetHighestRole(updatedAccountInfo.roles),
          isEmailVerified: updatedAccountInfo.isEmailVerified,
          isPhoneVerified: updatedAccountInfo.isPhoneVerified,
          isBlocked: updatedAccountInfo.isBlocked,
        });
      },
      onFinal: async () => {},
    });
  };

  return (
    <>
      <Grid item xs={6} sm={3}>
        <Box display="flex" justifyContent="center">
          <FormControlLabel
            labelPlacement="start"
            control={
              <LockedCheckbox
                name={updateParams.isEmailVerified}
                onChange={handleUpdate}
                checked={updateRequest.isEmailVerified}
              />
            }
            label={u.t(
              "admin_users_page__info_user_tab_account_info_is_email_verified_label"
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box display="flex" justifyContent="center">
          <FormControlLabel
            labelPlacement="start"
            control={
              <LockedCheckbox
                name={updateParams.isPhoneVerified}
                onChange={handleUpdate}
                checked={updateRequest.isPhoneVerified}
              />
            }
            label={u.t(
              "admin_users_page__info_user_tab_account_info_is_phone_verified_label"
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box display="flex" justifyContent="center">
          <FormControlLabel
            labelPlacement="start"
            control={
              <LockedCheckbox
                name={updateParams.isBlocked}
                onChange={handleUpdate}
                checked={updateRequest.isBlocked}
              />
            }
            label={u.t(
              "admin_users_page__info_user_tab_account_info_is_blocked_label"
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box display="flex" justifyContent="center">
          <LockedSelect
            disabled={!isSuperAdmin}
            name={updateParams.role}
            value={updateRequest.role}
            variant="outlined"
            onChange={handleUpdate}
          >
            <MenuItem disabled value={Role.Guest}>
              {u.t("role_guest")}
              {SpaceForSelectOptions}
            </MenuItem>
            <MenuItem value={Role.User}>
              {u.t("role_user")}
              {SpaceForSelectOptions}
            </MenuItem>
            <MenuItem value={Role.Admin}>
              {u.t("role_admin")}
              {SpaceForSelectOptions}
            </MenuItem>
            <MenuItem disabled value={Role.SuperAdmin}>
              {u.t("role_super_admin")}
              {SpaceForSelectOptions}
            </MenuItem>
          </LockedSelect>
        </Box>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isSuperAdmin:
      UserService.GetHighestRole(state.session.user.roles) === Role.SuperAdmin,
  };
};

export default connect(mapStateToProps)(UpdateAccount);
