import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../";
import Header from "./Header";
import Footer from "./Footer";
import FixedBtnDisplay from "./FixedBtnDisplay";
import useCheckScreenSize from "../../hooks/useCheckScreenSize";
import { OpenMenuContext } from "../../contexts";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigationStore } from "../../stores";
import { useEffect } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useCheckScreenSize();
  const location = useLocation();
  const addRoute = useNavigationStore((state) => state.addRoute);

  useEffect(() => {
    addRoute(location.pathname); // Add the current path to the history
  }, [location.pathname, addRoute]);

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
