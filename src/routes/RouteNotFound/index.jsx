import { Helmet, HelmetProvider } from "react-helmet-async";

export default function RouteNotFound() {
  <HelmetProvider>
  <Helmet prioritizeSeoTags>
    <meta name="description" content="" />
    <title>Route Not Found</title>
  </Helmet>
  return <div className="error">Page not found</div>;
  </HelmetProvider>
}
