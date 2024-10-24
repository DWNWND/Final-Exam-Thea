import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <div>
        <h1>Home</h1>
      </div>
    </HelmetProvider>
  );
}
