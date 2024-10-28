export default function SelectBtns({ filters, setFilters }) {
  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setFilters("unique")} className={`${filters == "unique" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        Unique bookings
      </button>
      <button onClick={() => setFilters("luxury")} className={`${filters == "luxury" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        Luxury stays
      </button>
      <button onClick={() => setFilters("rating")} className={`${filters == "rating" ? "bg-primary-blue text-white" : "border border-solid border-color-primary-blue text-primary-blue"} rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        Rating
      </button>
    </div>
  );
}
