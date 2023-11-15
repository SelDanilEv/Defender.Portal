import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";

const WelcomeMenuButton = (props: any) => {
  const u = useUtils();

  return (
    <LockedButton
      variant="contained"
      sx={{ fontSize: "0.8em" }}
      onClick={() => u.react.navigate(props.path)}
    >
      {props.text}
    </LockedButton>
  );
};

export default WelcomeMenuButton;
