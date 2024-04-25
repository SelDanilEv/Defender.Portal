import { Card, Grid, TextField, CardHeader } from "@mui/material";

import useUtils from "src/appUtils";
import { useEffect, useState } from "react";

import { UserAccountInfo } from "src/models/UserAccountInfo";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import { AdminUpdateUserInfoRequest } from "src/models/requests/admin/updateUser/AdminUpdateUserInfoRequest";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import {
  EmailRegex,
  PhoneNumberRegex,
  UserNicknameRegex,
  PhoneNumberMaskRegex,
  EmailMaskRegex,
} from "src/consts/Regexes";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestBuilder from "src/api/APIWrapper/RequestBuilder";
import apiUrls from "src/api/apiUrls";

interface UpdateUserInfoProps {
  userInfo: UserAccountInfo;
}

const UpdateUserInfo = (props: UpdateUserInfoProps) => {
  const u = useUtils();

  const { userInfo: userInfo } = props;
  const [originalUserInfo, setOriginalUserInfo] = useState<UserAccountInfo>({
    ...userInfo,
  });

  const [updateRequest, setUpdateRequest] =
    useState<AdminUpdateUserInfoRequest>({
      userId: userInfo.id,
      email: userInfo.email,
      phoneNumber: userInfo.phone,
      nickname: userInfo.nickname,
    });

  const [isUpdateAllowed, setIsUpdateAllowed] = useState<boolean>(false);

  useEffect(() => {
    setIsUpdateAllowed(
      (EmailRegex.test(updateRequest.email) &&
        updateRequest.email !== originalUserInfo.email) ||
        (PhoneNumberRegex.test(updateRequest.phoneNumber) &&
          updateRequest.phoneNumber !== originalUserInfo.phone) ||
        (UserNicknameRegex.test(updateRequest.nickname) &&
          updateRequest.nickname !== originalUserInfo.nickname)
    );
  }, [updateRequest, originalUserInfo]);

  const updateParams = ParamsObjectBuilder.Build(u, updateRequest);

  const UpdateRequest = (event) => {
    const { name, value } = event.target;

    setUpdateRequest((prevState) => {
      if (
        name === updateParams.nickname &&
        value !== "" &&
        !UserNicknameRegex.test(value)
      ) {
        return prevState;
      }

      if (
        name === updateParams.phoneNumber &&
        value !== "" &&
        !PhoneNumberMaskRegex.test(value)
      ) {
        return prevState;
      }

      if (
        name === updateParams.email &&
        value !== "" &&
        !EmailMaskRegex.test(value)
      ) {
        return prevState;
      }

      return { ...prevState, [name]: value };
    });
  };

  const PrepareRequest = () => {
    if (!isUpdateAllowed) return null;

    var request = {
      userId: updateRequest.userId,
    };

    if (
      EmailRegex.test(updateRequest.email) &&
      updateRequest.email !== originalUserInfo.email
    ) {
      request[updateParams.email] = updateRequest.email;
    }

    if (
      PhoneNumberRegex.test(updateRequest.phoneNumber) &&
      updateRequest.phoneNumber !== originalUserInfo.phone
    ) {
      request[updateParams.phoneNumber] = updateRequest.phoneNumber;
    }

    if (
      UserNicknameRegex.test(updateRequest.nickname) &&
      updateRequest.nickname !== originalUserInfo.nickname
    ) {
      request[updateParams.nickname] = updateRequest.nickname;
    }

    return request;
  };

  const handleUpdate = () => {
    const requestToApi = PrepareRequest();

    if (!requestToApi) return;

    APICallWrapper({
      url: apiUrls.admin.updateUserInfo,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestBuilder.BuildBody(requestToApi),
      },
      utils: u,
      showSuccess: true,
      onSuccess: async (response) => {
        var updatedUserInfo: UserAccountInfo = await response.json();
        setOriginalUserInfo(updatedUserInfo);
      },
      onFinal: async () => {},
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          title={u.t("admin_users_page__info_user_tab_user_info_title")}
        />
        <Grid container spacing={2} p={1.5}>
          <Grid item xs={12} sm={8}>
            <TextField
              name={updateParams.nickname}
              label={u.t(
                "admin_users_page__info_user_tab_user_info_nickname_label"
              )}
              InputProps={{ style: { fontSize: "1.5em" } }}
              value={updateRequest.nickname}
              onChange={UpdateRequest}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name={updateParams.phoneNumber}
              label={u.t(
                "admin_users_page__info_user_tab_user_info_phone_label"
              )}
              InputProps={{ style: { fontSize: "1.5em" } }}
              value={updateRequest.phoneNumber}
              onChange={UpdateRequest}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              name={updateParams.email}
              label={u.t(
                "admin_users_page__info_user_tab_user_info_email_label"
              )}
              InputProps={{ style: { fontSize: "1.5em" } }}
              value={updateRequest.email}
              onChange={UpdateRequest}
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
              {u.t("admin_users_page__info_user_tab_user_info_update_button")}
            </LockedButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default UpdateUserInfo;
