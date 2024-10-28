import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../DataProvider";
import { IoIosSearch } from "react-icons/io";
import { searchableLocations } from "../../../assets/locations/searchableLocations.js";

export default function LocationLookAhead({ register, setValue }) {
  const { venues } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchableLocations, setSearchableLocations] = useState([]);

  // useEffect(() => {
  //   if (venues && venues.length > 0) {
  //     const locationsSet = new Set(venues.map((venue) => venue.location.city).filter((city) => city));
  //     const locationsArr = Array.from(locationsSet);
  //     setSearchableLocations(locationsArr);
  //   }
  //   console.log("searchableLocations", searchableLocations);
  // }, [venues]);

  const searchResult = searchableLocations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()));
  const searchQueryAndResultMatches = searchableLocations.some((location) => location.toLowerCase() === searchQuery.toLowerCase());

  return (
    <div className="relative">
      <div className="flex justify-between items-center rounded-full border-primary-green border px-3  bg-white">
        <input autoComplete="off" className=" p-2 bg-transparent w-full italic text-primary-green placeholder:text-primary-light" {...register("location")} id="searchInput" type="search" placeholder="Where do you want to go?" aria-label="Search by City" onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <IoIosSearch className="text-2xl" />
      </div>
      {searchableLocations && searchQuery.length > 0 && (
        <div className={`${!searchQueryAndResultMatches && "bg-white border border-primary-green shadow-md"} rounded-md absolute top-12 w-full p-4`}>
          {!searchQueryAndResultMatches && (
            <>
              <p className="italic text-primary-green mb-2">Please select a location from the list:</p>
              <div className="line"></div>
            </>
          )}
          <ul className="bg-white">
            {searchResult
              .filter((location) => searchQuery.toLowerCase() !== location.toLowerCase())
              .map((location) => (
                <li
                  className="hover:bg-primary-light p-2 cursor-pointer"
                  key={location}
                  onClick={() => {
                    setSearchQuery(location);
                    setValue("location", location);
                  }}>
                  {location}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
