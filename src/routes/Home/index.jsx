import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <div>
        <h1 className="text-center text-3xl font-bold underline">Hello World</h1>
        <h1 className="text-sm">Home</h1>
      </div>
    </HelmetProvider>
  );
}
