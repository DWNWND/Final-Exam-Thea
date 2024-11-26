import { ArrowRightBtn, SquareBtn } from "../../Buttons";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { ListingCardSkeletonLoader } from "../../Loaders";

interface Media {
  url: string;
  alt: string;
}

interface Location {
  city: string;
  country: string;
}

interface Listing {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: Location;
  media: Media[];
  bookings: { id: string }[];
}

interface ListingCardProps {
  listing?: Listing; // Listing can be undefined during loading
  loading: boolean;
  myListings?: boolean;
}

export function ListingCard({ listing, loading, myListings = false }: ListingCardProps) {
  const { userName, venueManager } = useAuthStore();

  return (
    <>
      {loading && <ListingCardSkeletonLoader />}
      {listing && (
        <div key={listing.id} className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
          <Link to={`/listing/${listing.id}`} className="h-48 w-full absolute z-30 rounded-lg"></Link>
          <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>
          <div className="relative">
            <ArrowRightBtn href={`/listing/${listing.id}`} listing={true} tailw="z-30" />
            <img src={listing.media.length > 0 ? listing.media[0].url : ""} alt={listing.media.length > 0 ? listing.media[0].alt : ""} className="w-full h-48 object-cover rounded-t-lg" />
            <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {listing.price}/night</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between cursor-default">
              <div>
                <h3 className="text-xl font-bold text-black">{listing.name}</h3>
                <p className="text-black">
                  {listing.location.city}, {listing.location.country}
                </p>
              </div>
              <div>
                <p className="text-nowrap text-primary-blue">★ {listing.rating}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              {myListings && (
                <>
                  <Link to={venueManager ? `/user/${userName}/occupancy/${listing.id}` : ""} className="z-40">
                    <SquareBtn innerText={listing.bookings.length >= 1 ? "Check occupancy" : "This property has no bookings yet"} tailw={listing.bookings.length < 1 ? "hover:shadow-none cursor-default lowercase" : "lowercase"} borderColor={listing.bookings.length >= 1 ? "primary-green" : "none"} width="full" bgColor="" textColor="primary-green" disabled={listing.bookings.length < 1} />
                  </Link>
                  <Link to={venueManager ? `/user/${userName}/edit/${listing.id}` : ""} className="z-40">
                    <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tailw={!venueManager ? "hover:shadow-none cursor-default lowercase" : "lowercase"} bgColor="" textColor="primary-green" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// import { ArrowRightBtn, SquareBtn } from "../../Buttons";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../../../stores";
// import { ListingCardSkeletonLoader } from "../../Loaders";

// export function ListingCard({ listing, loading, myListings = false }) {
//   const { userName, venueManager } = useAuthStore();

//   return (
//     <>
//       {loading && <ListingCardSkeletonLoader />}
//       {listing && (
//         <div key={listing.id} className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
//           <Link to={"/listing/" + listing.id} className="h-48 w-full absolute z-30 rounded-lg"></Link>
//           <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>
//           <div className="relative">
//             <ArrowRightBtn href={"/listing/" + listing.id} listing={true} tailw="z-30" />
//             <img src={listing.media.length > 0 ? listing.media[0].url : null} alt={listing.media.length > 0 ? listing.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
//             <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {listing.price}/night</p>
//           </div>
//           <div className="p-4 flex flex-col gap-4">
//             <div className="flex justify-between cursor-default">
//               <div>
//                 <h3 className="text-xl font-bold text-black">{listing.name}</h3>
//                 <p className="text-black">
//                   {listing.location.city}, {listing.location.country}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-nowrap text-primary-blue">★ {listing.rating}</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 ">
//               {myListings && (
//                 <>
//                   <Link to={`${venueManager ? `/user/${userName}/occupancy/${listing.id}` : ""}`} className="z-40">
//                     <SquareBtn innerText={`${listing.bookings.length >= 1 ? "Check occupancy" : "this property has no bookings yet"}`} tailw={`${listing.bookings.length < 1 && "hover:shadow-none cursor-default"} lowercase`} borderColor={listing.bookings.length >= 1 ? "primary-green" : "none"} width="full" bgColor="" textColor="primary-green" disabled={listing.bookings.length < 1} />
//                   </Link>
//                   <Link to={`${venueManager ? `/user/${userName}/edit/${listing.id}` : ""}`} className="z-40">
//                     <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tailw={`${!venueManager && "hover:shadow-none cursor-default"} lowercase`} bgColor="" textColor="primary-green" />
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
