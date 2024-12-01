import { RoundBtn } from "..";

interface SelectCategoryBtnsProps {
  filters: string;
  setFilters: (filter: string) => void;
}

export function SelectCategoryBtns({ filters, setFilters }: SelectCategoryBtnsProps) {
  return (
    <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start">
      <RoundBtn clickFunc={() => setFilters("unique listings")} tail="py-2" innerText="Unique listings" bgColor={filters === "unique listings" ? "primary-green" : "white"} textColor={filters === "unique listings" ? "white" : "primary-green"} borderColor="primary-green" />
      <RoundBtn clickFunc={() => setFilters("luxury stays")} tail="py-2" innerText="Luxury stays" bgColor={filters === "luxury stays" ? "primary-green" : "white"} textColor={filters === "luxury stays" ? "white" : "primary-green"} borderColor="primary-green" />
      <RoundBtn clickFunc={() => setFilters("top rated properties")} tail="py-2" innerText="Top rated properties" bgColor={filters === "top rated properties" ? "primary-green" : "white"} textColor={filters === "top rated properties" ? "white" : "primary-green"} borderColor="primary-green" />
    </div>
  );
}
