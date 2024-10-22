import { default as Layout } from "./components/Layout";
import * as routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "search/:query", element: <routes.ListingSearch /> },
      { path: "listing/:id", element: <routes.ListingSpesific /> },
      { path: "booking/summary", element: <routes.BookingSummary /> },
      { path: "booking/details", element: <routes.BookingDetails /> },
      { path: "booking/payment", element: <routes.BookingPayment /> },
      { path: "booking/success", element: <routes.BookingSuccess /> },
      { path: "login", element: <routes.Contact /> },
      { path: "register", element: <routes.Contact /> },
      { path: ":username", element: <routes.Contact /> },
      { path: ":username/edit/:listingid", element: <routes.Contact /> },
      { path: ":username/new/listing", element: <routes.Contact /> },
      { path: ":username/settings", element: <routes.Contact /> },
      { path: ":username/my-listings", element: <routes.Contact /> },
      { path: ":username/my-bookings", element: <routes.Contact /> },
      // { path: "contact", element: <routes.Contact /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
