const AddMenu = (result) => {
  result.sidebar_menu_header_home = "Home";
  result.sidebar_menu_page_home = "Home page";
  result.sidebar_menu_header_admin = "Admin";
  result.sidebar_menu_page_users = "Users";
  result.sidebar_menu_header_super_admin = "Super Admin";
  result.sidebar_menu_page_configuration = "Configuration";

  return result;
};

const AddHeaderMenu = (result) => {
  result.sidebar_header_menu_profile = "My profile";
  result.sidebar_header_menu_logout = "Sign out";

  result.sidebar_header_menu_title_notification = "Notifications";
  result.sidebar_header_menu_no_notifications = "No new notifications";

  return result;
};

const AddConfigurationPage = (result) => {
  result.configuration_page_title = "Service status";
  result.configuration_page_api_status = "API status";
  result.configuration_page_configuration = "Configuration";
  result.configuration_page_configuration_level = "Configuration level";

  return result;
};

const AddPersonalInfoPage = (result) => {
  result.personal_ingo_page_title = "User id";
  result.personal_ingo_page_account_info = "Account info";
  result.personal_ingo_page_save = "Save";
  result.personal_ingo_page_name_field = "Name";
  result.personal_ingo_page_email_field = "Email";
  result.personal_ingo_page_created_date_field = "Created date";
  result.personal_ingo_page_approve = "Approve";
  result.personal_ingo_page_account_updated_message = "User info updated";

  return result;
};

const AddWelcomePage = (result) => {
  result.welcome_page_sign_in_with = "Sign in with";
  result.welcome_page_sign_in = "Sign in";
  result.welcome_page_create = "Create";
  result.welcome_page_or = "OR";
  result.welcome_page_create_account = "Create account !";
  result.welcome_page_back_to_login_page = "Back";

  result.welcome_page_email_label = "Email";
  result.welcome_page_login_label = "Login";
  result.welcome_page_password_label = "Password";
  result.welcome_page_nickname_label = "Nickname";
  result.welcome_page_phone_label = "Phone";

  result.welcome_page_email_verification_error_label = "Verification failed";
  result.welcome_page_email_verification_pending_label =
    "We're verifying your email ...";
  result.welcome_page_email_verification_success_label =
    "Your email has been verified";

  result.welcome_page_email_verification_description =
    "To continue please check your email and follow the verification link";
  result.welcome_page_resend_verification_email = "Resend verification";
  result.welcome_page_verification_email_sent =
    "Verification link sent to your email";

  return result;
};

const AddPages = (result) => {
  result = AddWelcomePage(result);

  result = AddPersonalInfoPage(result);

  result = AddConfigurationPage(result);

  return result;
};

const AddPureWords = (result) => {
  // statuses
  result.Pending = "Pending";
  result.Error = "Error";
  result.Warning = "Warning";
  result.Success = "Success";

  // health
  result.Healthy = "Healthy";
  result.Unhealthy = "Unhealthy";

  // data
  result.NoData = "No data";

  // roles
  result.role_admin = "Admin";
  result.role_super_admin = "Super Admin";
  result.role_user = "User";

  return result;
};

const AddErrors = (result) => {
  result.Error_UnhandledError = "Unhandled error";
  result.Error_TokenExpired = "Your session expired. Please login again";

  result.Error_EmptyLogin = "Empty login";
  result.Error_EmptyEmail = "Empty email";
  result.Error_EmptyNickname = "Empty nickname";
  result.Error_EmptyPassword = "Empty Password";

  result.Error_InvalidEmail = "Invalid email";
  result.Error_InvalidLoginOrPassword = "Invalid login or password";

  result.Error_PasswordIsTooShort = "Minimum password length: 4 characters";
  result.Error_PasswordIsTooLong = "Maximum password length: 16 characters";

  result.Error_EmailAddressInUse = "Email is already in use";
  result.Error_PhoneNumberInUse = "Phone number is already in use";
  result.Error_NicknameInUse = "Nickname is already in use";

  result.Error_NicknameIsTooShort = "Minimum nickname length: 4 characters";
  result.Error_NicknameIsTooLong = "Maximum nickname length: 16 characters";

  result.Error_AccessCodeWasExpired = "Verefication link was expired";
  result.Error_AccessCodeWasAlreadyUsed = "Access code was already used";

  result.Error_UserBlocked = "The user is blocked";

  result.Error_AuthorizationFailed = "Error during authorization";

  return result;
};

const en = () => {
  let result = {};

  result = AddMenu(result);

  result = AddHeaderMenu(result);

  result = AddPages(result);

  result = AddPureWords(result);

  result = AddErrors(result);

  return result;
};

export default en();
