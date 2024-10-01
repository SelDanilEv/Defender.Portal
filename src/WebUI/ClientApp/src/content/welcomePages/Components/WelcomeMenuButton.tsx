import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";

const WelcomeMenuButton = (props: any) => {
  const u = useUtils();

  return (
    <LockedButton
      variant="contained"
      sx={{ fontSize: "0.8em" }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
        return u.react.navigate(props.path);
      }}
    >
      {props.text}
    </LockedButton>
  );
};

export default WelcomeMenuButton;
