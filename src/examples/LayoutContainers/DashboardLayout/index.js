import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if we're on an authentication page
    const isAuthPage = pathname.startsWith("/authentication");

    if (!isAuthPage) {
      setLayout(dispatch, "dashboard");
    }
  }, [pathname]);

  // Don't render the dashboard layout on authentication pages
  if (pathname.startsWith("/authentication")) {
    return children;
  }

  return (
    <MDBox
      sx={({ breakpoints, transitions }) => ({
        p: { xs: 1, sm: 2, md: 3 },
        position: "relative",
        background: "transparent",
        transition: transitions.create(["margin-left", "margin-right"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        "& > *": {
          width: "100%",
          maxWidth: "100%",
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
