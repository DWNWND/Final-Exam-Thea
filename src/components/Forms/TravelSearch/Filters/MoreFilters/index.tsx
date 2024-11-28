import { useState } from "react";
import { useTravelSearchStore } from "../../../../../stores";
import { ArrowDownBtn } from "../../../../Buttons";

interface MoreFiltersProps {
  color: string;
  mainSearch?: boolean;
}

export function MoreFilters({ color, mainSearch = true }: MoreFiltersProps): JSX.Element {
  const [openMoreFilters, setOpenMoreFilters] = useState<boolean>(false);

  const { travelSearchData, setFreeWifi, setPetsAllowed, setFreeParking, setFreeBreakfast, setPrice100, setPrice100to200, setPrice200to300, setPrice300to400, setPrice400to500, setPrice500 } = useTravelSearchStore();

  const toggleOpenMoreFilters = () => setOpenMoreFilters(!openMoreFilters);

  return (
    <div>
      <ArrowDownBtn clickFunc={toggleOpenMoreFilters} innerText="More filters" link={true} mainSearch={mainSearch} open={openMoreFilters} />
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openMoreFilters ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
        <div className={`flex flex-col gap-6 ${mainSearch ? "md:flex-row md:gap-20 md:justify-evenly" : ""}`}>
          <div className={`flex flex-col gap-2 ${mainSearch ? "md:pb-10" : ""}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Filters</div>
            <div className={`flex flex-col gap-2 ${mainSearch ? "lg:flex-row lg:gap-6" : ""}`}>
              <div className={`flex flex-col gap-2 xl:flex-row xl:gap-6`}>
                <div className="flex items-center">
                  <input id="freeWifi" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setFreeWifi(e.target.checked)} defaultChecked={travelSearchData.freeWifi} />
                  <label htmlFor="freeWifi" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    Free wifi
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="freeParking" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setFreeParking(e.target.checked)} defaultChecked={travelSearchData.freeParking} />
                  <label htmlFor="freeParking" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    Free parking
                  </label>
                </div>
              </div>
              <div className={`flex flex-col gap-2 xl:flex-row xl:gap-6`}>
                <div className="flex items-center">
                  <input id="petsAllowed" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPetsAllowed(e.target.checked)} defaultChecked={travelSearchData.petsAllowed} />
                  <label htmlFor="petsAllowed" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    Pets allowed
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="freeBreakfast" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setFreeBreakfast(e.target.checked)} defaultChecked={travelSearchData.freeBreakfast} />
                  <label htmlFor="freeBreakfast" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    Breakfast included
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 ${mainSearch ? "md:pb-10" : ""}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input id="priceRange1" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice100(e.target.checked)} defaultChecked={travelSearchData.price100} />
                  <label htmlFor="priceRange1" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 0 - 100
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="priceRange2" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice100to200(e.target.checked)} defaultChecked={travelSearchData.price100to200} />
                  <label htmlFor="priceRange2" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 100 - 200
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input id="priceRange3" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice200to300(e.target.checked)} defaultChecked={travelSearchData.price200to300} />
                  <label htmlFor="priceRange3" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 200 - 300
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="priceRange4" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice300to400(e.target.checked)} defaultChecked={travelSearchData.price300to400} />
                  <label htmlFor="priceRange4" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 300 - 400
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input id="priceRange5" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice400to500(e.target.checked)} defaultChecked={travelSearchData.price400to500} />
                  <label htmlFor="priceRange5" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 400 - 500
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="priceRange6" type="checkbox" className="h-6 w-6 cursor-pointer" onChange={(e) => setPrice500(e.target.checked)} defaultChecked={travelSearchData.price500} />
                  <label htmlFor="priceRange6" className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
                    kr 500 - up
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
