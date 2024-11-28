export function SettingsFormSkeletonLoader(): JSX.Element {
  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full animate-pulse">
      <div className="flex justify-between items-center w-full mb-6">
        <div className="h-6 w-1/4 bg-comp-gray rounded"></div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-comp-gray rounded-full"></div>
          <div className="ml-2 h-4 w-1/3 bg-comp-gray rounded"></div>
        </div>
        <div>
          <div className="h-4 w-1/5 bg-comp-gray mb-2 rounded"></div>
          <div className="h-10 w-full bg-comp-gray rounded"></div>
        </div>
        <div>
          <div className="h-4 w-1/5 bg-comp-gray mb-2 rounded"></div>
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-xl">
            <div>
              <div className="h-4 w-1/4 bg-comp-gray mb-2 rounded"></div>
              <div className="h-10 w-full bg-comp-gray rounded"></div>
            </div>
            <div>
              <div className="h-4 w-1/4 bg-comp-gray mb-2 rounded"></div>
              <div className="h-10 w-full bg-comp-gray rounded"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-4 w-1/5 bg-comp-gray mb-2 rounded"></div>
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-xl">
            <div>
              <div className="h-4 w-1/4 bg-comp-gray mb-2 rounded"></div>
              <div className="h-10 w-full bg-comp-gray rounded"></div>
            </div>
            <div>
              <div className="h-4 w-1/4 bg-comp-gray mb-2 rounded"></div>
              <div className="h-10 w-full bg-comp-gray rounded"></div>
            </div>
          </div>
        </div>
        <div className="h-10 w-full bg-comp-gray rounded"></div>
      </div>
    </div>
  );
}
