import RoundBtn from "../../Buttons/RoundBtn";

//fix the H2 element on the homepage
export default function SelectCategoryBtns({ filters, setFilters }) {
  return (
    <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start">
      <RoundBtn clickFunc={() => setFilters("unique")} tailw="py-2" innerText="Unique bookings" bordered={filters == "unique" ? false : true} bgColor={filters == "unique" ? "primary-green" : "white"} textColor={filters == "unique" ? "white" : "primary-green"} borderColor="primary-green" />
      <RoundBtn clickFunc={() => setFilters("luxury")} tailw="py-2" innerText="Luxury stays" bordered={filters == "luxury" ? false : true} bgColor={filters == "luxury" ? "primary-green" : "white"} textColor={filters == "luxury" ? "white" : "primary-green"} borderColor="primary-green" />
      <RoundBtn clickFunc={() => setFilters("rating")} tailw="py-2" innerText="Top rated properties" bordered={filters == "rating" ? false : true} bgColor={filters == "rating" ? "primary-green" : "white"} textColor={filters == "rating" ? "white" : "primary-green"} borderColor="primary-green" />
    </div>
  );
}
