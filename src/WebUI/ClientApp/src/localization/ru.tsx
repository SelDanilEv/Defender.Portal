const AddMenu = (result) => {
  result.sidebar_menu__header_home = "Основное";
  result.sidebar_menu__page_home = "Основная";
  result.sidebar_menu__header_admin = "Админская";
  result.sidebar_menu__page_users = "Пользователи";
  result.sidebar_menu__header_super_admin = "Супер Админская";
  result.sidebar_menu__page_configuration = "Конфигурация";

  return result;
};

const AddHeaderMenu = (result) => {
  result.sidebar_header__menu_profile = "Мой профиль";
  result.sidebar_header__menu_logout = "Выйти";
  result.sidebar_header__menu_title_notification = "Уведомления";
  result.sidebar_header__menu_no_notifications = "Нет новых уведомлений";

  return result;
};

const AddConfigurationPage = (result) => {
  result.configuration_page__title = "Статус сервиса";
  result.configuration_page__api_status = "Cтатус API";
  result.configuration_page__configuration = "Конфигурация";
  result.configuration_page__configuration_level = "Уровень конфигурации";

  return result;
};

const AddPersonalInfoPage = (result) => {
  result.personal_info_page__title = "ID пользователя";
  result.personal_info_page__account_info = "Информация об аккаунте";
  result.personal_info_page__save = "Сохранить";
  result.personal_info_page__name_field = "Никнейм";
  result.personal_info_page__email_field = "Почта";
  result.personal_info_page__created_date_field = "Дата создания";
  result.personal_info_page__approve = "Подтвердить";
  result.personal_info_page__account_updated_message =
    "Данные аккаунта обновлены";

  return result;
};

const AddWelcomePage = (result) => {
  result.welcome_page__sign_in_with = "Войти через";
  result.welcome_page__sign_in = "Войти";
  result.welcome_page__create = "Создать";
  result.welcome_page__or = "Или";
  result.welcome_page__create_account = "Создать аккаунт !";
  result.welcome_page__back_to_login_page = "Назад";

  result.welcome_page__email_label = "Имейл";
  result.welcome_page__login_label = "Логин";
  result.welcome_page__password_label = "Пароль";
  result.welcome_page__nickname_label = "Никнейм";
  result.welcome_page__phone_label = "Телефон";

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
