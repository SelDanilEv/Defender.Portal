using Defender.Common.Errors;

namespace WebUI.ErrorMapping;

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
            ErrorCode.VL_ACC_InvalidEmail => UIErrorCodes.Error_InvalidEmail,

            ErrorCode.BR_ACC_UserIsBlocked => UIErrorCodes.Error_UserBlocked,

            ErrorCode.BR_USM_EmailAddressInUse => UIErrorCodes.Error_EmailAddressInUse,

            ErrorCode.BR_USM_PhoneNumberInUse => UIErrorCodes.Error_PhoneNumberInUse,

            ErrorCode.BR_USM_NicknameInUse => UIErrorCodes.Error_NicknameInUse,

            ErrorCode.VL_USM_EmptyLogin or
            ErrorCode.VL_ACC_EmptyLogin => UIErrorCodes.Error_EmptyLogin,

            ErrorCode.VL_USM_EmptyEmail or
            ErrorCode.VL_ACC_EmptyEmail => UIErrorCodes.Error_EmptyEmail,

            ErrorCode.VL_USM_EmptyNickname or
            ErrorCode.VL_ACC_EmptyNickname => UIErrorCodes.Error_EmptyNickname,

            ErrorCode.VL_ACC_EmptyPassword => UIErrorCodes.Error_EmptyPassword,

            ErrorCode.VL_ACC_MinPasswordLength => UIErrorCodes.Error_PasswordIsTooShort,

            ErrorCode.VL_ACC_MaxPasswordLength => UIErrorCodes.Error_PasswordIsTooLong,

            ErrorCode.BR_USM_UserWithSuchLoginIsNotExist or
            ErrorCode.BR_ACC_InvalidPassword => UIErrorCodes.Error_InvalidLoginOrPassword,

            ErrorCode.VL_USM_MinNicknameLength or
            ErrorCode.VL_ACC_MinNicknameLength => UIErrorCodes.Error_NicknameIsTooShort,

            ErrorCode.VL_ACC_MaxNicknameLength or
            ErrorCode.VL_USM_MaxNicknameLength => UIErrorCodes.Error_NicknameIsTooLong,

            ErrorCode.BR_ACC_AccessCodeWasExpired => UIErrorCodes.Error_AccessCodeWasExpired,
            ErrorCode.BR_ACC_AccessCodeWasAlreadyUsed => UIErrorCodes.Error_AccessCodeWasAlreadyUsed,
            ErrorCode.BR_ACC_InvalidAccessCode => UIErrorCodes.Error_InvalidAccessCode,

            ErrorCode.VL_USM_InvalidPhoneNumber or
            ErrorCode.VL_ACC_InvalidPhoneNumber => UIErrorCodes.Error_InvalidPhoneNumber,

            ErrorCode.VL_WLT_EmptyWalletNumber => UIErrorCodes.Error_EmptyWalletNumber,
            ErrorCode.BR_WLT_WalletIsNotExist => UIErrorCodes.Error_WalletIsNotExist,
            ErrorCode.BR_WLT_SenderAndRecipientAreTheSame or
            ErrorCode.VL_WLT_InvalidWalletNumber => UIErrorCodes.Error_InvalidWalletNumber,

            ErrorCode.CM_InvalidUserJWT => UIErrorCodes.Error_SessionExpired,

            ErrorCode.UnhandledError => UIErrorCodes.Error_UnhandledError,

            ErrorCode.BR_WLT_CurrencyAccountAlredyExist or
            ErrorCode.BR_WLT_CurrencyAccountIsNotExist or
            ErrorCode.BR_WLT_SenderCurrencyAccountIsNotExist or
            ErrorCode.BR_WLT_RecipientCurrencyAccountIsNotExist or
            ErrorCode.BR_WLT_NoAvailableWalletNumbers or
            ErrorCode.BR_WLT_InvalidTransactionStatus or
            ErrorCode.BR_WLT_NotEnoughFunds or
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
            ErrorCode.BR_ACC_AdminCannotChangeAdminPassword or
            ErrorCode.BR_ACC_UserCanUpdateOnlyOwnAccount or
            ErrorCode.BR_ACC_SuperAdminCannotBeBlocked or
            ErrorCode.BR_ACC_AdminCannotBlockAdmins or
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
            ErrorCode.CM_ForbiddenAccess or

            _ => UIErrorCodes.Error_UnhandledError
        };
    }
}
