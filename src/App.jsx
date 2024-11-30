import Layout from "./components/Layout";
import * as routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScrollToTop } from "./utils/";
import { useInactivityCheckHook } from "./hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "search", element: <routes.ListingSearch /> },
      { path: "listing/:id", element: <routes.ListingSpesific /> },
      { path: "booking/details", element: <routes.BookingDetails /> },
      { path: "booking/checkout", element: <routes.BookingCheckout /> },
      { path: "booking/confirmation/:id", element: <routes.BookingConfirmation /> },
      { path: "login", element: <routes.Login /> },
      { path: "register", element: <routes.Register /> },
      { path: "/user/:username", element: <routes.MyProfile /> },
      { path: "/user/:username/edit/:id", element: <routes.EditListing /> },
      { path: "/user/:username/occupancy/:id", element: <routes.Occupancy /> },
      { path: "/user/:username/new/listing", element: <routes.NewListing /> },
      { path: "/user/:username/settings", element: <routes.MySettings /> },
      { path: "/user/:username/mylistings", element: <routes.MyListings /> },
      { path: "/user/:username/mybookings", element: <routes.MyBookings /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  useInactivityCheckHook();

  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}
