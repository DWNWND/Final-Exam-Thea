import { Helmet, HelmetProvider } from "react-helmet-async";
import ErrorFallback from "../../components/ErrorFallback";
import MainElement from "../../components/MainElement";

export default function RouteNotFound(): JSX.Element {
  console.log("RouteNotFound");

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>Route Not Found | Holidaze</title>
        <meta name="description" content="Route not found" />
      </Helmet>
      <MainElement>
        <ErrorFallback errorMessage="Page not found" />
      </MainElement>
    </HelmetProvider>
  );
}
