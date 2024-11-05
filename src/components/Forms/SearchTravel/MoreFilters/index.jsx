import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import Checkbox from "../../../Inputs/Checkbox/index.jsx";

export default function MoreFilters({ color, mainSearch }) {
  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const { travelSearchData, setFreeWifi, setPetsAllowed, setFreeParking, setFreeBreakfast, setPrice100, setPrice100to200, setPrice200to300, setPrice300to400, setPrice400to500, setPrice500 } = useSearchStore();

  function handleClick() {
    setOpenMoreFilters(!openMoreFilters);
  }

  return (
    <>
      <div className={`${openMoreFilters && "underline"} w-full justify-center hover:underline cursor-pointer flex items-center text-${color} gap-2`} onClick={() => handleClick()}>
        <span>More filters</span>
        {openMoreFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openMoreFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`flex flex-col gap-6 ${mainSearch && "md:flex-row md:gap-20 md:justify-evenly"}`}>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Filters</div>
            <div className={`flex flex-col gap-2 ${mainSearch && "lg:flex-row lg:gap-6"}`}>
              <div className={`flex flex-col gap-2  xl:flex-row xl:gap-6`}>
                <Checkbox color={color} checked={travelSearchData.freeWifi} innerText="Free wifi" id="freeWifi" onChangeFunc={(e) => setFreeWifi(e.target.checked)} />
                <Checkbox color={color} checked={travelSearchData.freeParking} innerText="Free parking" id="freeParking" onChangeFunc={(e) => setFreeParking(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2 xl:flex-row xl:gap-6">
                <Checkbox color={color} checked={travelSearchData.petsAllowed} innerText="Pets allowed" id="petsAllowed" onChangeFunc={(e) => setPetsAllowed(e.target.checked)} />
                <Checkbox color={color} checked={travelSearchData.freeBreakfast} innerText="Breakfast included" id="freeBreakfast" onChangeFunc={(e) => setFreeBreakfast(e.target.checked)} />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 ${mainSearch && "md:pb-10"}`}>
            <div className={`text-${color} uppercase font-semibold text-lg`}>Price range /night</div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={travelSearchData.price100} innerText="kr 0 - 100" id="priceRange1" onChangeFunc={(e) => setPrice100(e.target.checked)} />
                <Checkbox color={color} checked={travelSearchData.price100to200} innerText="kr 100 - 200" id="priceRange2" onChangeFunc={(e) => setPrice100to200(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={travelSearchData.price200to300} innerText="kr 200 - 300" id="priceRange3" onChangeFunc={(e) => setPrice200to300(e.target.checked)} />
                <Checkbox color={color} checked={travelSearchData.price300to400} innerText="kr 300 - 400" id="priceRange4" onChangeFunc={(e) => setPrice300to400(e.target.checked)} />
              </div>
              <div className="flex flex-col gap-2">
                <Checkbox color={color} checked={travelSearchData.price400to500} innerText="kr 400 - 500" id="priceRange5" onChangeFunc={(e) => setPrice400to500(e.target.checked)} />
                <Checkbox color={color} checked={travelSearchData.price500} innerText="kr 500 - up" id="priceRange6" onChangeFunc={(e) => setPrice500(e.target.checked)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function Checkbox({ innerText, id, onChangeFunc, color, checked }) {
//   return (
//     <div className="flex items-center">
//       <input id={id} type="checkbox" className="h-6 w-6 cursor-pointer" onChange={onChangeFunc} defaultChecked={checked} />
//       <label htmlFor={id} className={`ml-2 text-nowrap text-${color} cursor-pointer`}>
//         {innerText}
//       </label>
//     </div>
//   );
// }