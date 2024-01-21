// ButtonUtils.ts
import { useState } from 'react';
import { DictionaryType } from 'src/customTypes';
import { ButtonStatusHided, ButtonStatusDisabled, ButtonStatusDisplayed } from './statuses';

const useButtonUtils = (dictionary: DictionaryType) => {

  const [pageButtons, setPageButtons] = useState<DictionaryType>(dictionary);

  const isButtonDisplayed = (buttonName: string): boolean => {
    return pageButtons[buttonName] === ButtonStatusDisplayed;
  };

  const isButtonDisabled = (buttonName: string): boolean => {
    return pageButtons[buttonName] === ButtonStatusDisabled;
  };

  const isButtonVisible = (buttonName: string): boolean => {
    return (
      pageButtons[buttonName] === ButtonStatusDisabled ||
      pageButtons[buttonName] === ButtonStatusDisplayed
    );
  };

  const updateButtonStatus = (buttonName: string, status: string) => {
    if(!pageButtons || pageButtons[buttonName] == status) return;

    setPageButtons((prevButtons) => ({
      ...prevButtons,
      [buttonName]: status,
    }));
  };

  return {
    pageButtons,
    isButtonDisplayed,
    isButtonDisabled,
    isButtonVisible,
    updateButtonStatus,
  };
};

export default useButtonUtils;
