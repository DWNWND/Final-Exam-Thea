export function OccupancyOverviewSkeletonLoader(): JSX.Element {
  return (
    <div className="flex flex-col md:flex-row w-full gap-8">
      <div className="w-full xl:sticky xl:top-6 flex flex-col gap-8">
        <div className="rounded-lg shadow-sm bg-white relative flex flex-col w-full animate-pulse">
          <div className="h-48 md:h-[30rem] bg-comp-gray rounded-t-lg"></div>
          <div className="p-4 flex flex-col gap-4">
            <div className="h-6 bg-comp-gray rounded w-3/4"></div>
            <div className="h-4 bg-comp-gray rounded w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-comp-gray rounded w-1/2"></div>
              <div className="h-6 bg-comp-gray rounded w-1/4"></div>
            </div>
          </div>
        </div>
        <div className="flex bg-white rounded-lg justify-center animate-pulse">
          <div className="h-48 w-full bg-comp-gray rounded-lg"></div>
        </div>
      </div>
      <div className="w-full">
        <div className="h-6 bg-comp-gray rounded w-1/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-comp-gray rounded w-1/2 mb-3 animate-pulse"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="rounded-t-lg px-4 py-6 bg-comp-gray h-16"></div>
            <div className="p-6 flex flex-col gap-3">
              <div className="h-4 bg-comp-gray rounded w-3/4"></div>
              <div className="h-4 bg-comp-gray rounded w-1/2"></div>
              <div className="h-4 bg-comp-gray rounded w-1/4"></div>
            </div>
            <div className="bg-comp-gray p-6 rounded-b-lg h-12"></div>
          </div>
          <div className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="rounded-t-lg px-4 py-6 bg-comp-gray h-16"></div>
            <div className="p-6 flex flex-col gap-3">
              <div className="h-4 bg-comp-gray rounded w-3/4"></div>
              <div className="h-4 bg-comp-gray rounded w-1/2"></div>
              <div className="h-4 bg-comp-gray rounded w-1/4"></div>
            </div>
            <div className="bg-comp-gray p-6 rounded-b-lg h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
