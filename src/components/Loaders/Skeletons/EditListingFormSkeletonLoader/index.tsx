export function EditListingFormSkeletonLoader(): JSX.Element {
  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center w-full mb-6">
        <div className="h-8 bg-comp-gray rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-comp-gray rounded w-1/6 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="flex flex-col gap-3 mb-4">
          <div className="h-6 bg-comp-gray rounded w-1/4 animate-pulse"></div>
          <div className="flex gap-3 flex-col md:flex-row md:gap-8">
            <div className="h-6 w-1/4 bg-comp-gray rounded animate-pulse"></div>
            <div className="h-6 w-1/4 bg-comp-gray rounded animate-pulse"></div>
            <div className="h-6 w-1/4 bg-comp-gray rounded animate-pulse"></div>
            <div className="h-6 w-1/4 bg-comp-gray rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
        <div className="h-10 bg-comp-gray rounded animate-pulse w-full"></div>
      </div>
    </div>
  );
}
