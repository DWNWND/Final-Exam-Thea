import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MyBookings() {
  return (
    <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>My Bookings| Holidayz</title>
    </Helmet>
    <div>
      <h1>My Bookings</h1>
    </div>
    </HelmetProvider>
  );
}
