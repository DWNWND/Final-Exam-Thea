import Layout from "./components/Layout";
import * as routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScrollToTop } from "./utils/";
import { useAuthStore } from "./stores";

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
      // { path: "contact", element: <routes.Contact /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  const { logOut } = useAuthStore();
  //fix the inactivity timer to redirect to homepage when logging out and to alert inactivity before logging out
  // useInactivityCheckHook();

  //logout when the user closes the tab
  // useEffect(() => {
  //   const handleUnload = () => {
  //     logOut();
  //   };
  //   window.addEventListener("unload", handleUnload);
  //   return () => {
  //     window.removeEventListener("unload", handleUnload);
  //   };
  // }, []);

  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}
