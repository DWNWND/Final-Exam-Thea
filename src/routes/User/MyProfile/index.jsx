import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MyProfile() {
  return (
    <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>My Profile | Holidayz</title>
    </Helmet>
    <div>
      <h1>My Profile</h1>
    </div>
    </HelmetProvider>
  );
}
