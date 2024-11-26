export function DetailsFormSkeletonLoader(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full animate-pulse">
      <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
        <div className="h-6 bg-comp-gray rounded w-3/4"></div>
        <div className="h-4 bg-comp-gray rounded w-2/3 mt-2"></div> 
        <div className="h-4 bg-comp-gray rounded w-1/4 mt-2"></div>
        <div className="h-6 bg-comp-gray rounded-full w-1/2 mt-4"></div> 
      </div>
      <div className="w-full my-6">
        <div className="h-8 bg-comp-gray rounded w-1/3 mb-2"></div> 
        <div className="h-4 bg-comp-gray rounded w-1/2"></div> 
      </div>
      <form className="w-full flex flex-col gap-4 md:gap-6">
        <div className="h-12 bg-comp-gray rounded"></div>
        <div className="h-12 bg-comp-gray rounded"></div>
        <div className="h-12 bg-comp-gray rounded"></div>
        <div className="h-12 bg-comp-gray rounded"></div>
        <div className="h-12 bg-comp-gray rounded"></div> 
        <div className="flex items-center justify-between my-6">
          <div className="h-10 bg-comp-gray rounded-full w-24"></div>
        </div>
      </form>
    </div>
  );
}
