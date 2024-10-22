import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../";

export default function Layout() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <h1>Layout</h1>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
