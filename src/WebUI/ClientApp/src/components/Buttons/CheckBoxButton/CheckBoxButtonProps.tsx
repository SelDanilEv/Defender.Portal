import CustomButtonProps from "../Interface";

export default interface CheckBoxButtonProps extends CustomButtonProps {
  isChecked?: boolean;
  onCheck?: () => void;
  onUncheck?: () => void;
}
