import { Helmet, HelmetProvider } from "react-helmet-async";
import ErrorFallback from "../../components/ErrorFallback";
import MainElement from "../../components/MainElement";

export default function RouteNotFound() {
  console.log("RouteNotFound");

  <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>Route Not Found | Holidaze</title>
    </Helmet>
    <MainElement>
      <ErrorFallback errorMessage="Page not found" />
    </MainElement>
  </HelmetProvider>;
}
