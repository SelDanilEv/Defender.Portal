export type DictionaryType<T> = { [key: string]: T };

export type Dictionary<T extends string | number | symbol, U> = {
  [key in T]?: U;
};

export const GetEntities = <K extends string | number | symbol, V>(
  dictionary: Dictionary<K, V>
): [K, V][] => {
  return Object.entries(dictionary || {}) as [K, V][];
};
