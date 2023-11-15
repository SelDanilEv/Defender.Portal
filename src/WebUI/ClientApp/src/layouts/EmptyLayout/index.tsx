import { FC } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const EmptyLayout: FC = (props: any) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      <OverviewWrapper>
        <Helmet>
          <title>Defender Portal</title>
        </Helmet>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </OverviewWrapper>
    </Box>
  );
};

EmptyLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(EmptyLayout);
