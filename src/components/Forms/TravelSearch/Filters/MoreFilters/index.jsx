import { useState } from "react";
import { useTravelSearchStore } from "../../../../../stores";
import { CheckboxInput } from "../../../../Inputs";
import { ArrowDownBtn } from "../../../../Buttons";

export default function MoreFilters({ color, mainSearch = true }) {
  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const { travelSearchData, setFreeWifi, setPetsAllowed, setFreeParking, setFreeBreakfast, setPrice100, setPrice100to200, setPrice200to300, setPrice300to400, setPrice400to500, setPrice500 } = useTravelSearchStore();

  function toggleOpenMoreFilters() {
    setOpenMoreFilters(!openMoreFilters);
  }

  return (
    <div>
      <ArrowDownBtn clickFunc={toggleOpenMoreFilters} innerText="More filters" link={true} mainSearch={mainSearch} open={openMoreFilters} />
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openMoreFilters ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
        <div className={`flex flex-col gap-6 ${mainSearch && "md:flex-row md:gap-20 md:justify-evenly"}`}>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Filters</div>
            <div className={`flex flex-col gap-2 ${mainSearch && "lg:flex-row lg:gap-6"}`}>
              <div className={`flex flex-col gap-2  xl:flex-row xl:gap-6`}>
                <CheckboxInput color={color} checked={travelSearchData.freeWifi} innerText="Free wifi" id="freeWifi" onChangeFunc={(e) => setFreeWifi(e.target.checked)} />
                <CheckboxInput color={color} checked={travelSearchData.freeParking} innerText="Free parking" id="freeParking" onChangeFunc={(e) => setFreeParking(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <CheckboxInput color={color} checked={travelSearchData.petsAllowed} innerText="Pets allowed" id="petsAllowed" onChangeFunc={(e) => setPetsAllowed(e.target.checked)} />
                <CheckboxInput color={color} checked={travelSearchData.freeBreakfast} innerText="Breakfast included" id="freeBreakfast" onChangeFunc={(e) => setFreeBreakfast(e.target.checked)} />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <CheckboxInput color={color} checked={travelSearchData.price100} innerText="kr 0 - 100" id="priceRange1" onChangeFunc={(e) => setPrice100(e.target.checked)} />
                <CheckboxInput color={color} checked={travelSearchData.price100to200} innerText="kr 100 - 200" id="priceRange2" onChangeFunc={(e) => setPrice100to200(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <CheckboxInput color={color} checked={travelSearchData.price200to300} innerText="kr 200 - 300" id="priceRange3" onChangeFunc={(e) => setPrice200to300(e.target.checked)} />
                <CheckboxInput color={color} checked={travelSearchData.price300to400} innerText="kr 300 - 400" id="priceRange4" onChangeFunc={(e) => setPrice300to400(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <CheckboxInput color={color} checked={travelSearchData.price400to500} innerText="kr 400 - 500" id="priceRange5" onChangeFunc={(e) => setPrice400to500(e.target.checked)} />
                <CheckboxInput color={color} checked={travelSearchData.price500} innerText="kr 500 - up" id="priceRange6" onChangeFunc={(e) => setPrice500(e.target.checked)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
