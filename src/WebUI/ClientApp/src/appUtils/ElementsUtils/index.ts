import { DictionaryType } from 'src/customTypes';
import { ElementOptions } from './ElementOptions';

class ElementsUtils {
  elements: DictionaryType<ElementOptions>;
  
  constructor(dictionary: DictionaryType<ElementOptions>) {
    this.elements = dictionary;
  }

  getElements(): DictionaryType<ElementOptions> {
    return this.elements;
  }

  hide(buttonName: string) {
    if (!this.elements || !this.elements[buttonName]) return;

    this.elements = {
      ...this.elements,
      [buttonName]: { ...this.elements[buttonName], hidden: true },
    };
  }

  show(buttonName: string) {
    if (!this.elements || !this.elements[buttonName]) return;

    this.elements = {
      ...this.elements,
      [buttonName]: { ...this.elements[buttonName], hidden: false },
    };
  }

  disable(buttonName: string) {
    if (!this.elements || !this.elements[buttonName]) return;

    this.elements = {
      ...this.elements,
      [buttonName]: { ...this.elements[buttonName], disabled: true },
    };
  }

  enable(buttonName: string) {
    if (!this.elements || !this.elements[buttonName]) return;

    this.elements = {
      ...this.elements,
      [buttonName]: { ...this.elements[buttonName], disabled: false },
    };
  }
}

export default ElementsUtils;