import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../../contexts";
import ErrorFallback from "../../ErrorFallback";
import { ListingCard } from "../../Cards";

// Define the shape of the DataContext

interface Location {
  city: string;
  country: string;
}

interface Media {
  url: string;
  alt: string;
}

interface Listing {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  location: Location;
  media: Media[];
  bookings: { id: string }[];
}

interface DataContextType {
  displayedListings: Listing[];
  loading: boolean;
  error: string | null;
}

export default function ListNewest() {
  const { displayedListings, loading, error } = useContext(DataContext) as DataContextType; // Type the context

  return (
    <section className="p-4 py-12 bg-comp-green">
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">Our newest Listings</h2>
      {error ? (
        <ErrorFallback errorMessage={error} />
      ) : (
        <>
          {displayedListings && displayedListings.length >= 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedListings.slice(0, 6).map((listing) => (
                  <ListingCard listing={listing} key={listing.id} loading={loading} />
                ))}
              </div>
              <Link to="/#" className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
            </>
          )}
        </>
      )}
    </section>
  );
}

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { DataContext } from "../../../contexts";
// import ErrorFallback from "../../ErrorFallback";
// import { ListingCard } from "../../Cards";

// export default function ListNewest() {
//   const { displayedListings, loading, error } = useContext(DataContext);

//   return (
//     <section className="p-4 py-12 bg-comp-green">
//       <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">Our newest Listings</h2>
//       {error ? (
//         <ErrorFallback errorMessage={error} />
//       ) : (
//         <>
//           {displayedListings && displayedListings.length >= 2 && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
//                 {displayedListings.slice(0, 6).map((listing) => (
//                   <ListingCard listing={listing} key={listing.id} loading={loading} />
//                 ))}
//               </div>
//               <Link className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
//             </>
//           )}
//         </>
//       )}
//     </section>
//   );
// }
