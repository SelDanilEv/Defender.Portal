const AddMenu = (result) => {
  result.sidebar_menu_header_home = "Основное";
  result.sidebar_menu_page_home = "Основная";
  result.sidebar_menu_header_admin = "Админская";
  result.sidebar_menu_page_users = "Пользователи";
  result.sidebar_menu_header_super_admin = "Супер Админская";
  result.sidebar_menu_page_configuration = "Конфигурация";

  return result;
};

const AddHeaderMenu = (result) => {
  result.sidebar_header_menu_profile = "Мой профиль";
  result.sidebar_header_menu_logout = "Выйти";
  result.sidebar_header_menu_title_notification = "Уведомления";
  result.sidebar_header_menu_no_notifications = "Нет новых уведомлений";

  return result;
};

const AddConfigurationPage = (result) => {
  result.configuration_page_title = "Статус сервиса";
  result.configuration_page_api_status = "Cтатус API";
  result.configuration_page_configuration = "Конфигурация";
  result.configuration_page_configuration_level = "Уровень конфигурации";

  return result;
};

const AddPersonalInfoPage = (result) => {
  result.personal_ingo_page_title = "ID пользователя";
  result.personal_ingo_page_account_info = "Информация об аккаунте";
  result.personal_ingo_page_save = "Сохранить";
  result.personal_ingo_page_name_field = "Никнейм";
  result.personal_ingo_page_email_field = "Почта";
  result.personal_ingo_page_created_date_field = "Дата создания";
  result.personal_ingo_page_approve = "Подтвердить";
  result.personal_ingo_page_account_updated_message =
    "Данные аккаунта обновлены";

  return result;
};

const AddLoginPage = (result) => {
  result.login_page_sign_in_with = "Войти через";
  result.login_page_sign_in = "Войти";
  result.login_page_create = "Создать";
  result.login_page_or = "Или";
  result.login_page_create_account = "Создать аккаунт !";
  result.login_page_back_to_login_page = "Назад";

  result.login_page_email_label = "Имейл";
  result.login_page_login_label = "Логин";
  result.login_page_password_label = "Пароль";
  result.login_page_nickname_label = "Никнейм";
  result.login_page_phone_label = "Телефон";

  return result;
};

const AddPages = (result) => {
  result = AddLoginPage(result);

  result = AddPersonalInfoPage(result);

  result = AddConfigurationPage(result);

  return result;
};

const AddPureWords = (result) => {
  // statuses
  result.Pending = "Ожидание";
  result.Error = "Ошибка";
  result.Warning = "Предупреждение";
  result.Success = "Успех";

  // health
  result.Healthy = "Здоров";
  result.Unhealthy = "Не здоров";

  // data
  result.NoData = "Нет данных";

  // roles
  result.role_admin = "Админ";
  result.role_super_admin = "Супер Админ";
  result.role_user = "Пользователь";

  return result;
};

const AddErrors = (result) => {
  result.Error_UnhandledError = "Неизвестая ошибка";

  result.Error_EmptyLogin = "Пустой логин";
  result.Error_EmptyEmail = "Пустой имейл";
  result.Error_EmptyNickname = "Пустой никнейм";
  result.Error_EmptyPassword = "Пустой пароль";

  result.Error_InvalidEmail = "Invalid email";
  result.Error_InvalidLoginOrPassword = "Invalid login or password";

  result.Error_PasswordIsTooShort = "Minimum password length: 4 characters";
  result.Error_PasswordIsTooLong = "Maximum password length: 16 characters";

  result.Error_EmailAddressInUse = "Email is already in use";
  result.Error_PhoneNumberInUse = "Phone number is already in use";
  result.Error_NicknameInUse = "Nickname is already in use";

  result.Error_NicknameIsTooShort = "Minimum nickname length: 4 characters";
  result.Error_NicknameIsTooLong = "Maximum nickname length: 16 characters";

  result.Error_UserBlocked = "The user is blocked";

  result.Error_AuthorizationFailed = "Error during authorization";

  return result;
};

const ru = () => {
  let result = {};

  result = AddMenu(result);

  result = AddHeaderMenu(result);

  result = AddPages(result);

  result = AddPureWords(result);

  result = AddErrors(result);

  return result;
};

export default ru();
