import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MySettings() {
  return (
    <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>My Settings | Holidayz</title>
    </Helmet>
    <div>
      <h1>My Settings</h1>
    </div>
    </HelmetProvider>
  );
}
