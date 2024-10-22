import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MyListings() {
  return (
    <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>Booking Success | Holidayz</title>
    </Helmet>
    <div>
      <h1>My Listings</h1>
    </div>
    </HelmetProvider>
  );
}
