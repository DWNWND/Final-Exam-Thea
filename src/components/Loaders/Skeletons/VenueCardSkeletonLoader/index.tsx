export function VenueCardSkeletonLoader(): JSX.Element {
  return (
    <div className="rounded-lg shadow-sm bg-white relative flex flex-col">
      <div className="animate-pulse">
        <div className="h-48 bg-comp-gray rounded-t-lg"></div>
        <div className="p-4 flex flex-col gap-4 ">
          <div className="h-6 bg-comp-gray rounded w-3/4"></div>
          <div className="h-4 bg-comp-gray rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
