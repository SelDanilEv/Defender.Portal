export type DictionaryType<T> = { [key: string]: T };

export type Dictionary<T extends string | number | symbol, U> = {
  [key in T]?: U;
};
