import { Helmet, HelmetProvider } from "react-helmet-async";
import GeneralErrorFallback from "../../components/ErrorFallback/GeneralErrorFallback";
import MainElement from "../../components/MainElement";

export default function RouteNotFound(): JSX.Element {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>Route Not Found | Holidaze</title>
        <meta name="description" content="Route not found" />
      </Helmet>
      <MainElement>
        <GeneralErrorFallback errorMessage="Page not found" />
      </MainElement>
    </HelmetProvider>
  );
}
