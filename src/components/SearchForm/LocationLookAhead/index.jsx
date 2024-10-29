import { useState, useContext, useEffect } from "react";
// import { DataContext } from "../../DataProvider";
import { IoIosSearch } from "react-icons/io";
import { searchableLocations } from "../../../assets/locations/searchableLocations.js";

export default function LocationLookAhead({ register, setValue, color }) {
  // const { venues } = useContext(DataContext);
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
    <div className="relative w-full flex">
      <div className={`flex justify-between items-center rounded-full border-${color} border px-3  bg-white w-full`}>
        <input autoComplete="off" className={`p-2 bg-transparent w-full placeholder:font-normal placeholder:italic font-semibold text-${color} placeholder:text-${color}`} {...register("location")} id="searchInput" type="search" placeholder="Where do you want to go?" aria-label="Search by City" onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <IoIosSearch className={`text-2xl text-${color}`} />
      </div>
      {searchableLocations && searchQuery.length > 0 && (
        <div className={`${!searchQueryAndResultMatches && `bg-white border border-${color} shadow-md`} rounded-md absolute top-12 w-full p-4 z-40`}>
          {!searchQueryAndResultMatches && (
            <>
              <p className={`italic text-${color} mb-2`}>Please select a location from the list below:</p>
              <div className="line"></div>
            </>
          )}
          <ul className="bg-white">
            {searchResult
              .filter((location) => searchQuery.toLowerCase() !== location.toLowerCase())
              .map((location) => (
                <li
                  className={`hover:font-semibold p-2 cursor-pointer text-${color}`}
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
