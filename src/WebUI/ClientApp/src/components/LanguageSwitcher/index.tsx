import { connect } from "react-redux";

import LocalizationService from "src/services/LocalizationService";
import LockedSelect from "src/components/LockedComponents/LockedSelect/LockedSelect";
import { updateLanguage } from "src/actions/sessionActions";
import { MenuItem, Select } from "@mui/material";
import SpaceForSelectOptions from "src/consts/SpaceForSelectOptions";

const LanguageSwitcher = (props: any) => {
  const languages = LocalizationService.Languages;

  const { currentLanguage: currentLanguage, updateLanguage: updateLanguage } =
    props;

  const handleUpdateLanguage = (selectedLanguage: string) => {
    updateLanguage(selectedLanguage);
    LocalizationService.UpdateLanguage(selectedLanguage);
  };

  return (
    <LockedSelect
      variant="outlined"
      value={currentLanguage}
      onChange={(event) => {
        handleUpdateLanguage(event.target.value as string);
      }}
    >
      {languages.map((language) => (
        <MenuItem key={language.key} value={language.key}>
          {language.value}
          {SpaceForSelectOptions}
        </MenuItem>
      ))}
    </LockedSelect>
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
