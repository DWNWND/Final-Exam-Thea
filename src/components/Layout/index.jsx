import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, DataProvider } from "../";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DataProvider>
          <Header />
          <Outlet />
        </DataProvider>
      </ErrorBoundary>
    </>
  );
}
