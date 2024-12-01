import { useContext } from "react";
import { DataContext } from "../../../contexts";
import GeneralErrorFallback from "../../ErrorFallback/GeneralErrorFallback";
import { ListingCard } from "../../Cards";
import { DataContextType } from "../../../types";

export default function ListNewest(): JSX.Element {
  const { displayedListings, loading, error } = useContext(DataContext) as DataContextType;

  return (
    <section className="p-4 py-12 bg-comp-green">
      <h2 className="font-bold text-2xl md:text-3xl text-center md:text-left text-primary-green uppercase mb-6">Our newest Listings</h2>
      {error ? (
        <GeneralErrorFallback errorMessage={error} />
      ) : (
        <>
          {displayedListings && displayedListings.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {displayedListings.slice(0, 6).map((listing) => (
                <ListingCard listing={listing} key={listing.id} loading={loading} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
