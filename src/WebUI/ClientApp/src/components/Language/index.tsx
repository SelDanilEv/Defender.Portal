import { connect } from "react-redux";

import LocalizationService from "src/services/LocalizationService";
import LockedSelect from "src/components/LockedComponents/LockedSelect/LockedSelect";
import { updateLanguage } from "src/actions/sessionActions";

const LanguageSwitcher = (props: any) => {
  const languages = LocalizationService.Languages;

  return (
    <>
      <LockedSelect
        options={languages}
        defaultKey={props.currentLanguage}
        onSelect={(option) => {
          props.updateLanguage(option.key);
          LocalizationService.UpdateLanguage(option.key);
        }}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateLanguage: (payload: string) => {
      dispatch(updateLanguage(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
