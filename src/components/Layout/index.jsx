import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, DataProvider } from "../";

export function Layout() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <h1>Layout</h1>
        <DataProvider>
          <Outlet />
        </DataProvider>
      </ErrorBoundary>
    </div>
  );
}
