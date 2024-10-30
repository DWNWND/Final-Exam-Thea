import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, DataProvider } from "../";
import Header from "./Header";
import Footer from "./Footer";
import FixedBtnDisplay from "./FixedBtnDisplay";
import useCheckScreenSize from "../../hooks/useCheckScreenSize";

export default function Layout() {
  const isMobile = useCheckScreenSize();

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Outlet />
          {isMobile && <FixedBtnDisplay isMobile={isMobile}/>}
          <Footer />
      </ErrorBoundary>
    </>
  );
}
