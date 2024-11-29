import { Layout } from "./components";
import * as routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";
import useInactivityTimer from "./hooks/useInactivityTimer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "search", element: <routes.VenueSearch /> },
      { path: "venue/:id", element: <routes.VenueSpesific /> },
      { path: "booking/summary", element: <routes.BookingSummary /> },
      { path: "booking/details", element: <routes.BookingDetails /> },
      { path: "booking/checkout", element: <routes.BookingCheckout /> },
      { path: "booking/confirmation", element: <routes.BookingConfirmation /> },
      { path: "login", element: <routes.Login /> },
      { path: "register", element: <routes.Register /> },
      { path: "/user/:username", element: <routes.MyProfile /> },
      { path: "/user/:username/edit/:id", element: <routes.EditListing /> },
      { path: "/user/:username/new/listing", element: <routes.NewListing /> },
      { path: "/user/:username/settings", element: <routes.MySettings /> },
      // { path: ":username/my-venues", element: <routes.MyVenues /> },
      { path: "/user/:username/bookings", element: <routes.MyBookings /> },
      // { path: "contact", element: <routes.Contact /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  //fix the inactivity timer to redirect to homepage when logging out and to alert inactivity before logging out
  // useInactivityTimer();

  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}
