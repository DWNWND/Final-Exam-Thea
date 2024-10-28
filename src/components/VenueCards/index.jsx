export default function VenueCards({ venues, filters }) {
  if (venues) {
    console.log(venues);
  }
  return (
    <>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues
            // .filter((venue) => {
            //   if (filters === "unique") {
            //     return venue;
            //   } else if (filters === "luxury") {
            //     return venue;
            //   } else if (filters === "rating") {
            //     // return venue.rating >= 4;
            //   } else {
            //     return venue;
            //   }
            // })
            .map((venue) => (
              <div key={venue.id} className="rounded-lg shadow-md">
                <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-primary-green">{venue.name}</h2>
                  <p className="text-primary-light">{venue.location.city}</p>
                  <p className="text-primary-light">{venue.location.country}</p>
                  <p className="text-primary-light">{venue.rating}</p>
                  <p className="text-primary-light">{venue.price}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
