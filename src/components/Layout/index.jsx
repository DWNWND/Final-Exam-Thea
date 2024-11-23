import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../";
import Header from "./Header";
import Footer from "./Footer";
import FixedBtnDisplay from "./FixedBtnDisplay";
import { useScreenSizeCheckHook } from "../../hooks/";
import { OpenMenuContext } from "../../contexts";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigationStore } from "../../stores";
import { useEffect } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useScreenSizeCheckHook();
  const location = useLocation();
  const { addRoute } = useNavigationStore();

  useEffect(() => {
    addRoute(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <OpenMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <Header />
          <Outlet />
          {isMobile && <FixedBtnDisplay isMobile={isMobile} />}
          <Footer />
        </OpenMenuContext.Provider>
      </ErrorBoundary>
    </>
  );
}
