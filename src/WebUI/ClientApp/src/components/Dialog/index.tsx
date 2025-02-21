import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, DialogActions } from "@mui/material";
import LockedIconButton from "../LockedComponents/LockedIconButtons/LockedIconButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  disableBackdropClick?: boolean;
}

export default function CustomDialog({
  title,
  open,
  onClose,
  children,
  disableBackdropClick = false,
}: DialogProps) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={disableBackdropClick ? undefined : onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", px: "1em", py: "0.5em" }}>
        <Toolbar>
          <Typography
            sx={{ ml: 2, flex: 1, fontSize: "1.8em" }}
            variant="h6"
            component="div"
            align="center"
          >
            {title}
          </Typography>
          <DialogActions>
            <LockedIconButton
              edge="end"
              color="error"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </LockedIconButton>
          </DialogActions>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: "0.5em", sm: "1em", md: "1.2em" },
          px: { xs: "1.5em", sm: "3em", md: "5em" },
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
}
