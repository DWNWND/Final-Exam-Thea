import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts";
import { ListingCard } from "../../Cards";
import { useTravelSearchStore } from "../../../stores";

// Define the structure of the TravelSearchData
interface TravelSearchData {
  location: string;
  numberOfGuests: number;
  freeWifi: boolean;
  petsAllowed: boolean;
  freeParking: boolean;
  freeBreakfast: boolean;
  price100: boolean;
  price100to200: boolean;
  price200to300: boolean;
  price300to400: boolean;
  price400to500: boolean;
  price500: boolean;
}

interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: { id: string }[];
}

export default function ListSearch(): JSX.Element {
  const { travelSearchData } = useTravelSearchStore();
  const { displayedListings, loading } = useContext(DataContext) as {
    displayedListings: Listing[];
    loading: boolean;
  };
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [displayListings, setDisplayListings] = useState<Listing[]>([]);
  const initialDisplayCount = 10;
  const searchQuery = travelSearchData;

  useEffect(() => {
    const matches = displayedListings.filter((listing) => {
      // Location filter
      if (searchQuery.location.toLowerCase() && searchQuery.location.toLowerCase() !== listing.location.city.toLowerCase()) {
        return false;
      }
      // Amenities filter
      const amenities: (keyof TravelSearchData)[] = ["freeWifi", "petsAllowed", "freeParking", "freeBreakfast"];
      const amenitiesMatch = amenities.every((amenity) => !travelSearchData[amenity] || travelSearchData[amenity] === listing.meta[amenity.replace("free", "").toLowerCase() as keyof Listing["meta"]]);
      if (!amenitiesMatch) return false;

      // // Amenities filter
      // const amenities = [
      //   { key: "freeWifi", value: listing.meta.wifi },
      //   { key: "petsAllowed", value: listing.meta.pets },
      //   { key: "freeParking", value: listing.meta.parking },
      //   { key: "freeBreakfast", value: listing.meta.breakfast },
      // ];
      // const amenitiesMatch = amenities.every((amenity) => !searchQuery[amenity.key] || searchQuery[amenity.key] === amenity.value);
      // if (!amenitiesMatch) return false;

      // Guest capacity filter
      if (listing.maxGuests < searchQuery.numberOfGuests) return false;

      // Price filter
      // const priceFilters: (keyof TravelSearchData)[] = ["price100", "price100to200", "price200to300", "price300to400", "price400to500", "price500"];

      // const priceFilters = [
      //   { key: "price100", min: 0, max: 100 },
      //   { key: "price100to200", min: 100, max: 200 },
      //   { key: "price200to300", min: 200, max: 300 },
      //   { key: "price300to400", min: 300, max: 400 },
      //   { key: "price400to500", min: 400, max: 500 },
      //   { key: "price500", min: 500, max: Infinity },
      // ];
      // const priceMatch = priceFilters.some((filter) => searchQuery[filter.key] && listing.price >= filter.min && listing.price < filter.max);
      // if (!priceFilters.some((filter) => searchQuery[filter.key]) || priceMatch) return true;

      const priceFilters: { key: keyof TravelSearchData; min: number; max: number }[] = [
        { key: "price100", min: 0, max: 100 },
        { key: "price100to200", min: 100, max: 200 },
        { key: "price200to300", min: 200, max: 300 },
        { key: "price300to400", min: 300, max: 400 },
        { key: "price400to500", min: 400, max: 500 },
        { key: "price500", min: 500, max: Infinity },
      ];

      const priceMatch = priceFilters.some((filter) => {
        const isFilterActive = searchQuery[filter.key as keyof TravelSearchData];
        const isPriceInRange = listing.price >= filter.min && listing.price < filter.max;
        return isFilterActive && isPriceInRange;
      });

      if (!priceFilters.some((filter) => searchQuery[filter.key as keyof TravelSearchData]) || priceMatch) {
        return true;
      }
      return false;
    });

    setFilteredListings(matches);
    setDisplayListings(matches.slice(0, initialDisplayCount)); // Set initial displayed listings
  }, [displayedListings, searchQuery]);

  const handleLoadMore = (): void => {
    const newCount = displayListings.length + 10;
    setDisplayListings(filteredListings.slice(0, newCount));
  };

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl text-black">Results for {travelSearchData.location}</h1>
      <p className="text-black my-4">{`Showing ${displayListings.length} of ${filteredListings.length} listings (matching your search)`}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayListings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} loading={loading} />
        ))}
      </div>
      {filteredListings.length > displayListings.length && (
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg">
          Load more listings
        </button>
      )}
    </section>
  );
}

// import { useContext, useEffect, useState } from "react";
// import { DataContext } from "../../../contexts";
// import { ListingCard } from "../../Cards";
// import { useTravelSearchStore } from "../../../stores";

// export default function ListSearch() {
//   const { travelSearchData } = useTravelSearchStore();
//   const { displayedListings, loading } = useContext(DataContext);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [displayListings, setDisplayListings] = useState([]);
//   const initialDisplayCount = 10;
//   const searchQuery = travelSearchData;

//   useEffect(() => {
//     const matches = displayedListings.filter((listing) => {
//       // Location filter
//       if (searchQuery.location.toLowerCase() && searchQuery.location.toLowerCase() !== listing.location.city.toLowerCase()) return false;

//       // Amenities filter
//       const amenities = [
//         { key: "freeWifi", value: listing.meta.wifi },
//         { key: "petsAllowed", value: listing.meta.pets },
//         { key: "freeParking", value: listing.meta.parking },
//         { key: "freeBreakfast", value: listing.meta.breakfast },
//       ];
//       const amenitiesMatch = amenities.every((amenity) => !searchQuery[amenity.key] || searchQuery[amenity.key] === amenity.value);
//       if (!amenitiesMatch) return false;

//       // Guest capacity filter
//       if (listing.maxGuests < searchQuery.numberOfGuests) return false;

//       // Price filter
//       const priceFilters = [
//         { key: "price100", min: 0, max: 100 },
//         { key: "price100to200", min: 100, max: 200 },
//         { key: "price200to300", min: 200, max: 300 },
//         { key: "price300to400", min: 300, max: 400 },
//         { key: "price400to500", min: 400, max: 500 },
//         { key: "price500", min: 500, max: Infinity },
//       ];
//       const priceMatch = priceFilters.some((filter) => searchQuery[filter.key] && listing.price >= filter.min && listing.price < filter.max);
//       if (!priceFilters.some((filter) => searchQuery[filter.key]) || priceMatch) return true;

//       return false;
//     });

//     setFilteredListings(matches);
//     setDisplayListings(matches.slice(0, initialDisplayCount)); // Set initial displayed listings
//     // setIsLoading(false);
//   }, [displayedListings, searchQuery]);

//   const handleLoadMore = () => {
//     const newCount = displayListings.length + 10;
//     setDisplayListings(filteredListings.slice(0, newCount));
//   };

//   return (
//     <section className=" w-full">
//       <h1 className="font-bold text-2xl text-black">Results for {travelSearchData.location}</h1>
//       <p className="text-black my-4">{`Showing ${displayListings.length} of ${filteredListings.length} listings (matching your search)`}</p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {displayListings.map((listing) => (
//           <ListingCard listing={listing} key={listing.id} loading={loading} />
//         ))}
//       </div>
//       {filteredListings.length > displayListings.length && (
//         <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg">
//           Load more listings
//         </button>
//       )}
//     </section>
//   );
// }
