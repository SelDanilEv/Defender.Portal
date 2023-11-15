import { Box } from "@mui/material";

import useUtils from "src/appUtils";

const LineWithText = (props: any) => {
  const u = useUtils();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${props.margin_x} 0`,
      }}
    >
      <Box
        sx={{
          height: props.height,
          width: { lg: props.width_lg, md: props.width_md, xs: props.width_xs },
          backgroundColor: `${u.react.theme.colors.primary.dark}`,
          margin: `0 ${props.gap}`,
        }}
      />
      <Box sx={{ color: `${u.react.theme.colors.primary.dark}` }}>
        {props.text}
      </Box>
      <Box
        sx={{
          height: props.height,
          width: { lg: props.width_lg, md: props.width_md, xs: props.width_xs },
          backgroundColor: `${u.react.theme.colors.primary.dark}`,
          margin: `0 ${props.gap}`,
        }}
      />
    </Box>
  );
};

export default LineWithText;
