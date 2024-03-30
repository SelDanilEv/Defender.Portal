const AddMenu = (result) => {
  result.sidebar_menu__header_home = "Домой";
  result.sidebar_menu__page_home = "Главная";

  result.sidebar_menu__header_banking = "Банк";
  result.sidebar_menu__page_banking = "Банк";

  result.sidebar_menu__header_admin = "Админ";
  result.sidebar_menu__page_users = "Пользователи";
  result.sidebar_menu__header_super_admin = "Суперадмин";

  result.sidebar_menu__page_configuration = "Конфигурация";

  return result;
};

const AddHeaderMenu = (result) => {
  result.sidebar_header__menu_profile = "Профиль";
  result.sidebar_header__menu_logout = "Выход";

  result.sidebar_header__menu_title_notification = "Уведомления";
  result.sidebar_header__menu_no_notifications = "Нет уведомлений";

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
  result.personal_info_page__name_field = "Имя";
  result.personal_info_page__email_field = "Электронная почта";
  result.personal_info_page__password_field = "Пароль";
  result.personal_info_page__verification_code_field = "Код подтверждения";
  result.personal_info_page__created_date_field = "Дата создания";
  result.personal_info_page__approve = "Утвердить";
  result.personal_info_page__account_updated_message =
    "Информация пользователя обновлена";

  result.personal_info_page__sentitive_account_info = "Чувствительная зона";

  result.personal_info_page__button_save = "Сохранить";
  result.personal_info_page__button_procced = "Продолжить";
  result.personal_info_page__button_back = "Назад";

  result.personal_info_page__notification_procced =
    "Код подтверждения отправлен на ваш старый адрес электронной почты";

  result.personal_info_page__notification_activating_back_button =
    "Кнопка 'Назад' будет активна через 20 секунд";

  return result;
};

const AddWelcomePage = (result) => {
  result.welcome_page__sign_in_with = "Войти с помощью";
  result.welcome_page__sign_in = "Войти";
  result.welcome_page__create = "Создать";
  result.welcome_page__or = "ИЛИ";
  result.welcome_page__create_account = "Создать аккаунт!";
  result.welcome_page__back_to_login_page = "Назад";

  result.welcome_page__email_label = "Электронная почта";
  result.welcome_page__login_label = "Логин";
  result.welcome_page__password_label = "Пароль";
  result.welcome_page__nickname_label = "Никнейм";
  result.welcome_page__phone_label = "Телефон";

  result.welcome_page__email_verification_error_label = "Ошибка верификации";
  result.welcome_page__email_verification_pending_label =
    "Мы проверяем вашу электронную почту...";
  result.welcome_page__email_verification_success_label =
    "Ваша электронная почта подтверждена";

  result.welcome_page__email_verification_description =
    "Чтобы продолжить, проверьте свою электронную почту и перейдите по ссылке для подтверждения";
  result.welcome_page__resend_verification_email =
    "Отправить письмо для подтверждения снова";
  result.welcome_page__verification_email_sent =
    "Ссылка для подтверждения отправлена на вашу электронную почту";

  return result;
};

const AddBankingPage = (result) => {
  result.banking_page__wallet_title = "Цифровой кошелек";
  result.banking_page__wallet_button_create_account = "Создать аккаунт";
  result.banking_page__wallet_button_open_banking = "Открыть банкинг";
  result.banking_page__wallet_button_home = "Домой";
  result.banking_page__wallet_button_recharge_or_refund = "Пополнение/Возврат";

  result.banking_page__wallet_dialog_title_create_account = "Создать аккаунт";
  result.banking_page__wallet_dialog_label_currency = "Валюта";
  result.banking_page__wallet_dialog_button_create = "Создать";
  result.banking_page__wallet_dialog_title_recharge_or_refund =
    "Пополнение/Возврат";
  result.banking_page__wallet_dialog_recharge_or_refund_info_1 =
    "В настоящее время мы поддерживаем только ручное пополнение и возврат.";
  result.banking_page__wallet_dialog_recharge_or_refund_info_2 =
    "Пожалуйста, свяжитесь со мной напрямую по адресу danil.defender.apps@gmail.com.";

  result.banking_page__transfer_title = "Перевод денег";
  result.banking_page__transfer_button_transfer = "Перевод";
  result.banking_page__transfer_wallet_number_label = "Номер кошелька";
  result.banking_page__transfer_owner_name_label = "Имя владельца";
  result.banking_page__transfer_amount_label = "Сумма";

  result.banking_page__transfer_dialog_title_transfer = "Детали перевода";
  result.banking_page__transfer_dialog_success_message =
    "Ваша транзакция обрабатывается. Пожалуйста, подождите.";

  return result;
};

const AddPages = (result) => {
  result = AddWelcomePage(result);

  result = AddPersonalInfoPage(result);

  result = AddConfigurationPage(result);

  result = AddBankingPage(result);

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
  result.Loading = "Загрузка";
  result.Confirm = "Подтврердить";

  // roles
  result.role_admin = "Админ";
  result.role_super_admin = "Супер Админ";
  result.role_user = "Пользователь";

  result.Notification_Success = "Успешно";

  return result;
};

const AddErrors = (result) => {
  result.Error_UnhandledError = "Необработанная ошибка";
  result.Error_SessionExpired =
    "Ваша сессия истекла. Пожалуйста, войдите снова";

  result.Error_EmptyLogin = "Пустой логин";
  result.Error_EmptyEmail = "Пустой email";
  result.Error_EmptyNickname = "Пустой никнейм";
  result.Error_EmptyPassword = "Пустой пароль";
  result.Error_EmptyWalletNumber = "Пустой номер кошелька";

  result.Error_InvalidEmail = "Неверный email";
  result.Error_InvalidPhoneNumber = "Неверный номер телефона";
  result.Error_InvalidLoginOrPassword = "Неверный логин или пароль";

  result.Error_PasswordIsTooShort = "Минимальная длина пароля: 4 символа";
  result.Error_PasswordIsTooLong = "Максимальная длина пароля: 64 символа";

  result.Error_EmailAddressInUse = "Email уже используется";
  result.Error_PhoneNumberInUse = "Номер телефона уже используется";
  result.Error_NicknameInUse = "Никнейм уже используется";

  result.Error_NicknameIsTooShort = "Минимальная длина никнейма: 4 символа";
  result.Error_NicknameIsTooLong = "Максимальная длина никнейма: 128 символов";

  result.Error_AccessCodeWasExpired = "Ссылка для подтверждения истекла";
  result.Error_AccessCodeWasAlreadyUsed = "Код доступа уже использовался";
  result.Error_InvalidAccessCode = "Код доступа недействителен";

  result.Error_UserBlocked = "Пользователь заблокирован";

  result.Error_WalletIsNotExist = "Кошелек не найден";
  result.Error_SenderAndRecipientAreTheSame = "Кошелек не найден";
  result.Error_RecipientCurrencyAccountIsNotExist =
    "У получателя нет счета в выбранной валюте.";

  result.Error_AuthorizationFailed = "Ошибка при авторизации";

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
