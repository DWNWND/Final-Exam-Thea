import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../ErrorFallback/ErrorBoundaryFallback";
import Header from "./Header";
import Footer from "./Footer";
import FixedBtnDisplay from "./FixedBtnDisplay";
import { useScreenSizeCheckHook } from "../../hooks";
import { OpenMenuContext } from "../../contexts/";
import { useState, useEffect } from "react";
import { useNavigationStore } from "../../stores";

export default function Layout(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useScreenSizeCheckHook();
  const location = useLocation();
  const { addRoute } = useNavigationStore();

  useEffect(() => {
    addRoute(location.pathname);
  }, [location.pathname, addRoute]);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <OpenMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <Header />
          <Outlet />
          {isMobile && <FixedBtnDisplay />}
          <Footer />
        </OpenMenuContext.Provider>
      </ErrorBoundary>
    </>
  );
}
