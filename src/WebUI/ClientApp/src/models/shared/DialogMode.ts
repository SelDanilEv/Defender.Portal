export enum DialogMode {
  Hide = "hide",
  Info = "Inforamtion",
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
}

export function OpenDialog(mode: DialogMode): boolean {
  return mode !== DialogMode.Hide;
}
