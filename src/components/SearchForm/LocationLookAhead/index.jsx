import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../DataProvider";
import { IoIosSearch } from "react-icons/io";

export default function LocationLookAhead({ register, setValue }) {
  const { venues } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchableLocations, setSearchableLocations] = useState([]);

  useEffect(() => {
    if (venues && venues.length > 0) {
      const locationsSet = new Set(venues.map((venue) => venue.location.city).filter((city) => city));
      const locationsArr = Array.from(locationsSet);
      setSearchableLocations(locationsArr);
    }
    console.log("searchableLocations", searchableLocations);
  }, [venues]);

  const searchResult = searchableLocations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="flex justify-between items-center rounded-full border-primary-green border p-2 px-8  bg-white">
        <input className=" bg-white w-full italic text-primary-green placeholder:text-primary-light" {...register("location")} id="searchInput" type="search" placeholder="Where do you want to go?" aria-label="Search by City" onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <IoIosSearch className="text-2xl" />
      </div>
      {searchableLocations && searchQuery.length > 0 && (
        <ul>
          {searchResult
            .filter((location) => searchQuery.toLowerCase() !== location.toLowerCase())
            .map((location) => (
              <li
                key={location}
                onClick={() => {
                  setSearchQuery(location);
                  setValue("location", location);
                }}>
                {location}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
