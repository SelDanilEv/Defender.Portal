using Defender.Common.Errors;

namespace Defender.Portal.WebUI.ErrorMapping;

public class ErrorMappingHelper
{
    public static string MapErrorCode(string message)
    {
        return Map(message).ToString();
    }

    private static UIErrorCodes Map(string message)
    {
        var apiErrorCode = ErrorCodeHelper.ToErrorCode(message);

        return apiErrorCode switch
        {
            ErrorCode.VL_NTF_InvalidEmail or
            ErrorCode.VL_USM_InvalidEmail or
            ErrorCode.VL_ACC_InvalidEmail => UIErrorCodes.InvalidEmail,

            ErrorCode.BR_ACC_UserIsBlocked => UIErrorCodes.UserBlocked,

            ErrorCode.BR_USM_EmailAddressInUse => UIErrorCodes.EmailAddressInUse,

            ErrorCode.BR_USM_PhoneNumberInUse => UIErrorCodes.PhoneNumberInUse,

            ErrorCode.BR_USM_NicknameInUse => UIErrorCodes.NicknameInUse,

            ErrorCode.VL_USM_EmptyLogin or
            ErrorCode.VL_ACC_EmptyLogin => UIErrorCodes.EmptyLogin,

            ErrorCode.VL_USM_EmptyEmail or
            ErrorCode.VL_ACC_EmptyEmail => UIErrorCodes.EmptyEmail,

            ErrorCode.VL_USM_EmptyNickname or
            ErrorCode.VL_ACC_EmptyNickname => UIErrorCodes.EmptyNickname,

            ErrorCode.VL_ACC_EmptyPassword => UIErrorCodes.EmptyPassword,

            ErrorCode.VL_ACC_MinPasswordLength => UIErrorCodes.PasswordIsTooShort,

            ErrorCode.VL_ACC_MaxPasswordLength => UIErrorCodes.PasswordIsTooLong,

            ErrorCode.BR_USM_UserWithSuchLoginIsNotExist or
            ErrorCode.BR_ACC_InvalidPassword => UIErrorCodes.InvalidLoginOrPassword,

            ErrorCode.VL_USM_MinNicknameLength or
            ErrorCode.VL_ACC_MinNicknameLength => UIErrorCodes.NicknameIsTooShort,

            ErrorCode.VL_ACC_MaxNicknameLength or
            ErrorCode.VL_USM_MaxNicknameLength => UIErrorCodes.NicknameIsTooLong,

            ErrorCode.BR_ACC_AccessCodeWasExpired => UIErrorCodes.AccessCodeWasExpired,
            ErrorCode.BR_ACC_AccessCodeWasAlreadyUsed => UIErrorCodes.AccessCodeWasAlreadyUsed,
            ErrorCode.BR_ACC_InvalidAccessCode => UIErrorCodes.InvalidAccessCode,

            ErrorCode.VL_USM_InvalidPhoneNumber or
            ErrorCode.VL_ACC_InvalidPhoneNumber => UIErrorCodes.InvalidPhoneNumber,

            ErrorCode.VL_WLT_EmptyWalletNumber => UIErrorCodes.EmptyWalletNumber,
            ErrorCode.BR_WLT_WalletIsNotExist => UIErrorCodes.WalletIsNotExist,
            ErrorCode.BR_WLT_SenderAndRecipientAreTheSame or
            ErrorCode.VL_WLT_InvalidWalletNumber => UIErrorCodes.InvalidWalletNumber,
            ErrorCode.BR_WLT_SenderCurrencyAccountIsNotExist or
            ErrorCode.BR_WLT_CurrencyAccountIsNotExist or
            ErrorCode.BR_WLT_RecipientCurrencyAccountIsNotExist
                => UIErrorCodes.CurrencyAccountNotFound,

            ErrorCode.CM_InvalidUserJWT => UIErrorCodes.SessionExpired,

            ErrorCode.BR_ACC_UserCanUpdateOnlyOwnAccount or
            ErrorCode.BR_ACC_AdminCannotChangeAdminPassword or
            ErrorCode.BR_ACC_SuperAdminCannotBeBlocked or
            ErrorCode.BR_ACC_AdminCannotBlockAdmins or
            ErrorCode.CM_ForbiddenAccess => UIErrorCodes.ForbiddenAccess,

            ErrorCode.BR_WLT_NotEnoughFunds => UIErrorCodes.NotEnoughFunds,

            ErrorCode.UnhandledError => UIErrorCodes.UnhandledError,


            ErrorCode.BR_RGS_TicketPurchaseNotAllowed or
            ErrorCode.VL_BTS_InvalidPositionName or
            ErrorCode.VL_BTS_InvalidCurrency or
            ErrorCode.VL_BTS_NumberOfPositionsMustBePositive or
            ErrorCode.VL_BTS_NumberOfLatestMonthsMustBePositive or
            ErrorCode.ERAPI_RatesAreNotAvailable or
            ErrorCode.BR_WLT_TransactionCanNotBeCanceled or
            ErrorCode.BR_RGS_UnsupportedTransactionType or
            ErrorCode.BR_RGS_UnsupportedGameType or
            ErrorCode.BR_RGS_InvalidPaymentRequest or
            ErrorCode.BR_RGS_InvalidTransactionAmount or
            ErrorCode.BR_RGS_LotteryIsStillActive or
            ErrorCode.BR_RGS_LotteryDrawIsNotActive or
            ErrorCode.BR_RGS_CurrencyIsNotAllowed or
            ErrorCode.BR_RGS_TryingToPurchaseInvalidTickets or
            ErrorCode.BR_RGS_ThisBetIsNotAllowed or
            ErrorCode.VL_RGS_InvalidDrawNumber or
            ErrorCode.VL_RGS_InvalidTicketNumber or
            ErrorCode.VL_RGS_InvalidAmount or
            ErrorCode.VL_RGS_AmountOfTicketsMustBePositive or
            ErrorCode.BR_ACC or
            ErrorCode.BR_ACC_CodeTypeMismatch or
            ErrorCode.BR_USM or
            ErrorCode.BR_WLT or
            ErrorCode.VL_USM_EmptyAccessCode or
            ErrorCode.VL_ACC_EmptyAccessCode or
            ErrorCode.VL_WLT_TransferAmountMustBePositive or
            ErrorCode.BR_WLT_CurrencyAccountAlreadyExist or
            ErrorCode.BR_WLT_NoAvailableWalletNumbers or
            ErrorCode.BR_WLT_InvalidTransactionStatus or
            ErrorCode.VL_WLT_EmptyTransactionId or
            ErrorCode.VL_WLT_EmptyUserId or
            ErrorCode.CM_NotFound or
            ErrorCode.Unknown or
            ErrorCode.VL_InvalidRequest or
            ErrorCode.BR_PTL_UserActivityMustHaveUserId or
            ErrorCode.VL_USM_EmptyUserId or
            ErrorCode.ES_GoogleAPIIssue or
            ErrorCode.ES_SendinBlueIssue or
            ErrorCode.ES_WalutomatIssue or
            ErrorCode.VL_ACC_EmptyGoogleToken or
            ErrorCode.VL_ACC_EmptyUserId or
            ErrorCode.CM_DatabaseIssue or
            ErrorCode.CM_MappingIssue or
            ErrorCode.VL_USM_AtLeastOneFieldRequired or
            ErrorCode.BR_ACC_CodeWasNotVerified or
            ErrorCode.BR_WHS_NotSupportedCurrencyPair or
            ErrorCode.VL_NTF_EmptyNotificationId or
            ErrorCode.VL_NTF_EmptyRecipient or
            ErrorCode.VL_NTF_EmptySubject or
            ErrorCode.VL_NTF_EmptyBody or
            ErrorCode.VL_NTF_MinSubjectLength or
            ErrorCode.VL_NTF_MaxSubjectLength or
            ErrorCode.VL_NTF_MaxBodyLength or
            ErrorCode.VL_SCM_EmptySecretName or
            ErrorCode.VL_SCM_EmptySecretValue or

            _ => UIErrorCodes.UnhandledError
        };
    }
}
