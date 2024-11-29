import { useContext, useState } from "react";
import { DataContext } from "../../../contexts";
import GeneralErrorFallback from "../../ErrorFallback/GeneralErrorFallback";
import { SelectCategoryBtns } from "../../Buttons";
import { ListingCard } from "../../Cards";
import { DataContextType } from "../../../types";

export default function ListCategorized(): JSX.Element {
  const { displayedListings, loading, error } = useContext(DataContext) as DataContextType;
  const [filters, setFilters] = useState<string>("unique listings");

  return (
    <section className="p-4 pb-12 md:my-10">
      <SelectCategoryBtns filters={filters} setFilters={setFilters} />
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">{filters}</h2>
      {error ? (
        <GeneralErrorFallback errorMessage={error} />
      ) : (
        <>
          {displayedListings && displayedListings.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {displayedListings
                .filter((listing) => {
                  if (filters.toLowerCase().includes("unique")) {
                    return listing.name.toLowerCase().includes("unique") || listing.description.toLowerCase().includes("unique");
                  } else if (filters.toLowerCase().includes("luxury")) {
                    return listing.name.toLowerCase().includes("luxury") || listing.description.toLowerCase().includes("luxury");
                  } else if (filters.toLowerCase().includes("rating")) {
                    return listing.rating > 4;
                  } else {
                    return listing;
                  }
                })
                .slice(0, 4)
                .map((listing) => (
                  <ListingCard listing={listing} key={listing.id} loading={loading} />
                ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
