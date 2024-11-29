import { IoIosSearch } from "react-icons/io";
import { useApiCall } from "../../hooks";
import { ListingSpesific } from "../../types";
import { useNavigate } from "react-router-dom";
import { SmallSpinnerLoader } from "../Loaders";
import { useState } from "react";

export default function ListingSpesificSearch(): JSX.Element {
  const { loading, error, callApi } = useApiCall();
  const navigate = useNavigate();

  const [typedSearchQuery, setTypedSearchQuery] = useState<string>("");
  const [locationListOpen, setLocationListOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<ListingSpesific[]>([]);

  const fetchSearchedListings = async (searchQuery2: string) => {
    const result = await callApi(`/holidaze/venues/search?q=${searchQuery2}`);
    setSearchResult(result.data);
  };

  return (
    <div className="relative w-full flex">
      <div className={`flex justify-between items-center rounded-full border-primary-green border px-3 bg-white w-full`}>
        <input
          required
          autoComplete="off"
          className={`p-2 bg-transparent w-full placeholder:font-normal placeholder:italic font-semibold text-primary-green placeholder:text-primary-green`}
          value={typedSearchQuery}
          id="searchInput"
          type="search"
          placeholder="Search listings"
          aria-label="Search by City"
          onChange={(e) => {
            const searchQuerySearch = e.target.value;
            setTypedSearchQuery(searchQuerySearch);
            if (searchQuerySearch.length > 0) {
              setLocationListOpen(true);
              fetchSearchedListings(searchQuerySearch);
            }
          }}
        />
        <IoIosSearch className={`text-2xl text-primary-green`} />
      </div>
      {locationListOpen && typedSearchQuery.length > 0 && (
        <div className={`bg-white border border-primary-green shadow-md rounded-md absolute top-12 w-full p-4 z-[100] max-h-[50vh] overflow-y-auto`}>
          {loading ? (
            <SmallSpinnerLoader />
          ) : (
            <>
              {error ? (
                <>Error: {error}</>
              ) : (
                <>
                  <p className={`italic text-primary-green mb-2`}>Please select listing from the list below:</p>
                  <div className="line"></div>
                  <ul className="bg-white">
                    {searchResult.length > 0 ? (
                      searchResult.map((listings) => (
                        <li
                          className={`hover:font-semibold p-2 cursor-pointer text-primary-green`}
                          key={listings.id}
                          onClick={() => {
                            navigate(`listing/${listings.id}`);
                            setLocationListOpen(false);
                            setSearchResult([]);
                            setTypedSearchQuery("");
                          }}>
                          {listings.name}
                        </li>
                      ))
                    ) : (
                      <li className={`p-2 text-primary-green`} onClick={() => setTypedSearchQuery("")}>
                        No listing matching &quot;{typedSearchQuery}&quot; found.
                      </li>
                    )}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
