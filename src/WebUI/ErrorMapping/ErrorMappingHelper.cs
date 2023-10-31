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

        switch (apiErrorCode)
        {
            case ErrorCode.VL_ACC_InvalidEmail:
                return UIErrorCodes.Error_InvalidEmail;
            case ErrorCode.BR_ACC_UserIsBlocked:
                return UIErrorCodes.Error_UserBlocked;
            case ErrorCode.BR_USM_EmailAddressInUse:
                return UIErrorCodes.Error_EmailAddressInUse;
            case ErrorCode.BR_USM_PhoneNumberInUse:
                return UIErrorCodes.Error_PhoneNumberInUse;
            case ErrorCode.BR_USM_NicknameInUse:
                return UIErrorCodes.Error_NicknameInUse;
            case ErrorCode.VL_USM_EmptyLogin:
            case ErrorCode.VL_ACC_EmptyLogin:
                return UIErrorCodes.Error_EmptyLogin;
            case ErrorCode.VL_ACC_EmptyEmail:
                return UIErrorCodes.Error_EmptyEmail;
            case ErrorCode.VL_ACC_EmptyNickname:
                return UIErrorCodes.Error_EmptyNickname;
            case ErrorCode.VL_ACC_EmptyPassword:
                return UIErrorCodes.Error_EmptyPassword;
            case ErrorCode.VL_ACC_MinPasswordLength:
                return UIErrorCodes.Error_PasswordIsTooShort;
            case ErrorCode.VL_ACC_MaxPasswordLength:
                return UIErrorCodes.Error_PasswordIsTooLong;
            case ErrorCode.BR_USM_UserWithSuchLoginIsNotExist:
            case ErrorCode.BR_ACC_InvalidPassword:
                return UIErrorCodes.Error_InvalidLoginOrPassword;
            case ErrorCode.VL_ACC_MinNicknameLength:
                return UIErrorCodes.Error_NicknameIsTooShort;
            case ErrorCode.VL_ACC_MaxNicknameLength:
                return UIErrorCodes.Error_NicknameIsTooLong;


            case ErrorCode.BR_ACC_SuperAdminCannotBeBlocked:
            case ErrorCode.BR_ACC_AdminCannotBlockAdmins:
            case ErrorCode.BR_ACC_AccessCodeWasExpired:
            case ErrorCode.BR_ACC_AccessCodeWasAlreadyUsed:
            case ErrorCode.BR_ACC_AttemtsAreOver:
            case ErrorCode.BR_ACC_CodeWasNotVerified:
            case ErrorCode.BR_PTL_UserActivityMustHaveUserId:
            case ErrorCode.VL_USM_EmptyUserId:
            case ErrorCode.VL_ACC_EmptyGoogleToken:
            case ErrorCode.VL_ACC_EmptyUserId:
            case ErrorCode.VL_ACC_InvalidPhoneNumber:
            case ErrorCode.VL_NTF_EmptyNotificationId:
            case ErrorCode.VL_NTF_EmptyRecipient:
            case ErrorCode.VL_NTF_EmptySubject:
            case ErrorCode.VL_NTF_EmptyBody:
            case ErrorCode.VL_NTF_EmptyValidationLink:
            case ErrorCode.VL_NTF_MinSubjectLength:
            case ErrorCode.VL_NTF_MaxSubjectLength:
            case ErrorCode.VL_NTF_MaxBodyLength:
            case ErrorCode.VL_NTF_InvalidEmail:
            case ErrorCode.ES_GoogleAPIIssue:
            case ErrorCode.CM_ForbiddenAccess:
            case ErrorCode.BR_ACC_AdminCannotChangeAdminPassword:
            case ErrorCode.BR_ACC_UserCanUpdateOnlyOwnAccount:
            case ErrorCode.VL_InvalidRequest:
            case ErrorCode.CM_DatabaseIssue:
            case ErrorCode.ES_SendinBlueIssue:
            case ErrorCode.Unknown:
            case ErrorCode.UnhandledError:
            default:
                return UIErrorCodes.Error_UnhandledError;
        }

        return UIErrorCodes.Error_UnhandledError;
    }
}
