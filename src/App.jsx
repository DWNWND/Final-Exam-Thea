import { Layout } from "./components";
import * as routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "search/:query", element: <routes.VenueSearch /> },
      { path: "venue/:id", element: <routes.VenueSpesific /> },
      { path: "booking/summary", element: <routes.BookingSummary /> },
      { path: "booking/details", element: <routes.BookingDetails /> },
      { path: "booking/payment", element: <routes.BookingPayment /> },
      { path: "booking/success", element: <routes.BookingSuccess /> },
      { path: "login", element: <routes.Login /> },
      { path: "register", element: <routes.Register /> },
      { path: ":username", element: <routes.MyProfile /> },
      // { path: ":username/edit/:venueid", element: <routes.EditVenue /> },
      // { path: ":username/new/venue", element: <routes.NewVenue /> },
      { path: ":username/settings", element: <routes.MySettings /> },
      // { path: ":username/my-venues", element: <routes.MyVenues /> },
      { path: ":username/my-bookings", element: <routes.MyBookings /> },
      // { path: "contact", element: <routes.Contact /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
