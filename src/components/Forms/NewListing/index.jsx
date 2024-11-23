import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApiCall } from "../../../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquareBtn } from "../../Buttons";
import { MdEmojiFoodBeverage, MdOutlinePets } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaParking, FaWifi } from "react-icons/fa";
import { formatDateForDisplay, formatDateForFlatpickr } from "../../../utils/";
import { SmallSpinnerLoader } from "../../Loaders";

//FIX THE LISTING PREVIEW TO BE THE SAME STYLING AND INFORMATION AS IN THE SINGLE VENUE PAGE + ALSO ADD USER/OWNER INFO // ALSO DISABLE AND STYLE DISABLED SUBMIT BUTTON WHEN LOADING

const newListingSchema = [
  yup.object().shape({
    name: yup.string().min(4, "Please enter a valid property name. Minimum 4 characters.").required("Property name is required"),
  }),
  yup.object().shape({
    description: yup.string().min(4, "Please enter a valid property description").required("Property description is required"),
  }),
  yup.object().shape({
    price: yup.number().min(1, "Please enter a valid property price pr. night").required("Property price pr. night is required"),
  }),
  yup.object().shape({
    maxGuests: yup.number().min(1, "Please enter a valid property max guests").required("Property max guests is required"),
  }),
  yup.object().shape({
    rating: yup.number().min(1, "Please enter a valid rating 1-5").max(5, "Please enter a valid rating 1-5").required("Property rating is required"),
  }),
  yup.object().shape({
    location: yup.object().shape({
      address: yup.string().min(2, "Please enter a valid property address").required("Property address is required"),
      city: yup.string().min(2, "Please enter a valid city").required("Property city is required"),
      zip: yup.string().min(1, "Please enter a valid zip").required("Property zip id required"),
      country: yup.string().min(3, "Please enter a valid property country").required("Property country is required"),
    }),
  }),
  yup.object().shape({
    meta: yup.object().shape({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
  }),
  yup.object().shape({
    media: yup.array().of(
      yup.object().shape({
        url: yup.string().url("Please enter a valid url").required("Image url is required"),
        alt: yup.string().required("Description is required"),
      })
    ),
  }),
];

export default function NewListingForm() {
  const { scopedLoader, error, callApi } = useApiCall();
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formStep, setFormStep] = useState(0);
  const navigate = useNavigate();
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);

  function toggleAmenities() {
    setAmenitiesOpen(!amenitiesOpen);
  }
  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }
  function toggleAvailability() {
    setAvailabilityOpen(!availabilityOpen);
  }
  function toggleHostDetails() {
    setHostDetailsOpen(!hostDetailsOpen);
  }

  const todayString = formatDateForFlatpickr(new Date());
  const tomorrowString = formatDateForFlatpickr(new Date(new Date().setDate(new Date().getDate() + 1)));

  const startDate = new Date(todayString);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(tomorrowString);
  const formattedEndDate = formatDateForDisplay(endDate);

  const validFormStep = Math.min(formStep, newListingSchema.length - 1);
  const currentSchema = newListingSchema[validFormStep];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(currentSchema) });

  const nextStep = async (e) => {
    // e.preventDefault();
    if (isValid) {
      setFormStep((cur) => cur + 1);
    }
  };

  const prevStep = (e) => {
    // e.preventDefault();
    if (formStep > 0) {
      setFormStep((cur) => cur - 1);
    }
  };

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      price: parseFloat(data.price),
      maxGuests: parseInt(data.maxGuests, 10),
      rating: parseFloat(data.rating),
    };

    try {
      const result = await callApi(`/holidaze/venues`, {
        method: "POST",
        body: JSON.stringify(processedData),
      });

      let countdown = 3;
      setUserFeedbackMessage(`Listing published. Redirecting in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackMessage(`Listing published. Redirecting in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          navigate(`/venue/${result.data.id}`);
        }
      }, 1000);
    } catch (error) {
      console.log("error:", error);
      setErrorMessage("Failed to publish listing: " + error);
    }
  };

  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        {formStep === 0 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What is the name of your property?</h2>
            <label htmlFor="name" className="block text-primary-green mb-2">
              Listing title
            </label>
            <input placeholder="Our magical cabin" id="name" {...register("name")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errors.name && <p className="text-danger text-xs mt-2">{errors.name.message}</p>}
          </section>
        )}
        {formStep === 1 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">Describe your property:</h2>
            <label htmlFor="description" className="block text-primary-green mb-2">
              Description
            </label>
            <textarea id="description" placeholder="Tucked away in the forest, our cabin is the perfect getaway..." {...register("description")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} rows={4} />
            {errors.description && <p className="text-danger text-xs mt-2">{errors.description.message}</p>}
          </section>
        )}
        {formStep === 2 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What's your nightly price?</h2>
            <label htmlFor="price" className="block text-primary-green mb-2">
              NOK/night
            </label>
            <input placeholder="200" type="number" id="price" {...register("price")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errors.price && <p className="text-danger text-xs mt-2">{errors.price.message}</p>}
          </section>
        )}
        {formStep === 3 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">How many guests can you accommodate?</h2>
            <label htmlFor="maxGuests" className="block text-primary-green mb-2">
              Number of guests
            </label>
            <input placeholder="4" type="number" id="maxGuests" {...register("maxGuests")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.maxGuests ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errors.maxGuests && <p className="text-danger text-xs mt-2">{errors.maxGuests.message}</p>}
          </section>
        )}
        {formStep === 4 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What is your property rating?</h2>
            <label htmlFor="rating" className="block text-primary-green mb-2">
              Rating number between 1-5
            </label>
            <input placeholder="5" type="number" id="rating" {...register("rating")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errors.rating && <p className="text-danger text-xs mt-2">{errors.rating.message}</p>}
          </section>
        )}
        {formStep === 5 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">Where is the property located?</h2>
            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label htmlFor="location.address" className="block text-primary-green mb-2">
                  Address
                </label>
                <input placeholder="44 holland drive" id="location.address" {...register("location.address")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location?.address ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                {errors.location?.address && <p className="text-danger text-xs mt-1">{errors.location.address.message}</p>}
              </div>
              <div>
                <label htmlFor="location.city" className="block text-primary-green mb-2">
                  City
                </label>
                <input placeholder="New Amterdam" id="location.city" {...register("location.city")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location?.city ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                {errors.location?.city && <p className="text-danger text-xs mt-1">{errors.location.city.message}</p>}
              </div>
              <div>
                <label htmlFor="location.zip" className="block text-primary-green mb-2">
                  Zip code
                </label>
                <input placeholder="10683" id="location.zip" {...register("location.zip")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location?.zip ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                {errors.location?.zip && <p className="text-danger text-xs mt-1">{errors.location.zip.message}</p>}
              </div>
              <div>
                <label htmlFor="location.country" className="block text-primary-green mb-2">
                  Country
                </label>
                <input placeholder="Holland" id="location.country" {...register("location.country")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location?.country ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                {errors.location?.country && <p className="text-danger text-xs mt-1">{errors.location.country.message}</p>}
              </div>
            </div>
          </section>
        )}
        {formStep === 6 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What amenities does your property have?</h2>
            <div className="p-4 flex flex-col gap-3 mb-4">
              <div className="flex items-center">
                <input id="meta.wifi" type="checkbox" className="h-6 w-6 cursor-pointer" {...register("meta.wifi")} />
                <label htmlFor="meta.wifi" className={`ml-2 text-nowrap text-primary-green cursor-pointer`}>
                  Free Wifi
                </label>
              </div>
              <div className="flex items-center">
                <input id="meta.parking" type="checkbox" className="h-6 w-6 cursor-pointer" {...register("meta.parking")} />
                <label htmlFor="meta.parking" className={`ml-2 text-nowrap text-primary-green cursor-pointer`}>
                  Free parking
                </label>
              </div>
              <div className="flex items-center">
                <input id="meta.breakfast" type="checkbox" className="h-6 w-6 cursor-pointer" {...register("meta.breakfast")} />
                <label htmlFor="meta.breakfast" className={`ml-2 text-nowrap text-primary-green cursor-pointer`}>
                  Breakfast included
                </label>
              </div>
              <div className="flex items-center">
                <input id="meta.pets" type="checkbox" className="h-6 w-6 cursor-pointer" {...register("meta.pets")} />
                <label htmlFor="meta.pets" className={`ml-2 text-nowrap text-primary-green cursor-pointer`}>
                  Pets allowed
                </label>
              </div>
            </div>
          </section>
        )}
        {formStep === 7 && (
          <>
            <section>
              <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">Add a image of your property:</h2>
              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <label htmlFor="media[0].url" className="block text-primary-green mb-2">
                    Image url
                  </label>
                  <input placeholder="https://www.example.com/image.jpg" id="media[0].url" {...register("media[0].url")} className={`placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.media?.[0]?.url ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                  {errors.media?.[0]?.url && <p className="text-danger text-xs mt-2">{errors.media[0].url.message}</p>}
                </div>
                <div>
                  <label htmlFor="media[0].alt" className="block text-primary-green mb-2">
                    Description
                  </label>
                  <input placeholder="Our magical cabin" id="media[0].alt" {...register("media[0].alt")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.media?.[0]?.alt ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                  {errors.media?.[0]?.alt && <p className="text-danger text-xs mt-2">{errors.media[0].alt.message}</p>}
                </div>
              </div>
            </section>
          </>
        )}

        <div className="flex justify-between items-center">
          <SquareBtn innerText="Back" type="button" clickFunc={prevStep} disabled={formStep === 0} tailw={`${formStep === 0 ? "opacity-0" : "opacity-100"} hover:bg-white bg-opacity-50`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />
          <div className="flex justify-center gap-2 ">
            {newListingSchema.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${index <= formStep ? "bg-primary-green" : "bg-comp-green"} ${index <= formStep ? "cursor-pointer" : "cursor-not-allowed"}`} aria-label={`Go to step ${index + 1}`}></div>
            ))}
          </div>
          <SquareBtn innerText="Next" type="button" clickFunc={nextStep} disabled={!isValid || formStep === 8} width="auto" tailw={`${formStep === 8 ? "opacity-0" : "opacity-100"} hover:bg-white bg-opacity-50 ${!isValid && "opacity-50"}`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />
        </div>
        {formStep === 8 && (
          <>
            <div>
              <h2 className="mb-1 mt-3 font-bold uppercase text-lg text-center text-primary-blue">Listing preview</h2>
              <div className={`mt-4 ${formStep === 8 ? "opacity-100" : "opacity-45"}`}>
                <div className="relative">
                  <div className="absolute inset-x-0 top-6 flex flex-col justify-center items-center gap-4 z-30 cursor-pointer">
                    <h1 className="text-center text-2xl font-bold text-white">
                      {formattedStartDate} - {formattedEndDate}
                    </h1>
                    <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">kr {watch("price")} /night</div>
                  </div>
                  <div>
                    <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-lg"></div>
                    <img src={watch("media[0].url")} alt={watch("media[0].alt")} className="w-full h-96 md:h-[20rem] object-cover rounded-lg" />
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black">{watch("name")}</h3>
                    <p className="text-black">
                      {watch("location.city")}, {watch("location.country")}
                    </p>
                    <p className="text-black font-semibold mt-4">kr {watch("price")}/night</p>
                  </div>
                  <div>
                    <p>★ {watch("rating")}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Details title="Amenities" toggleState={amenitiesOpen} toggleFunc={toggleAmenities}>
                    <div className="flex flex-col mt-3 gap-2 p-4">
                      <p className="flex items-center gap-4">
                        {watch("meta.breakfast") && (
                          <>
                            <MdEmojiFoodBeverage />
                            Breakfast included
                          </>
                        )}
                      </p>
                      <p className="flex items-center gap-4">
                        {watch("meta.parking") && (
                          <>
                            <FaParking />
                            Free parking
                          </>
                        )}
                      </p>
                      <p className="flex items-center gap-4">
                        {watch("meta.pets") && (
                          <>
                            <MdOutlinePets />
                            Pets allowed
                          </>
                        )}
                      </p>
                      <p className="flex items-center gap-4">
                        {watch("meta.wifi") && (
                          <>
                            <FaWifi />
                            Free WiFi
                          </>
                        )}
                      </p>
                    </div>
                  </Details>
                  <Details title="Description" toggleState={descriptionOpen} toggleFunc={toggleDescription}>
                    <div className="flex flex-col mt-3  p-4">
                      <p className="">{watch("description")}</p>
                    </div>
                  </Details>
                  <Details title="Host details" toggleState={hostDetailsOpen} toggleFunc={toggleHostDetails}>
                    <div className="flex mt-3 gap-4 items-center p-4">
                      {/* <div>
                  <img src={venue.owner.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{venue.owner.name}</p>
                  <p className="">{venue.owner.bio}</p>
                  <p className="">Contact host via: {venue.owner.email}</p>
                </div> */}
                    </div>
                  </Details>
                  <Details title="Availability" toggleState={availabilityOpen} toggleFunc={toggleAvailability}>
                    <div className="flex mt-3 gap-4 p-4 py-10 bg-comp rounded-lg justify-center">{/* <div className="flex flex-col gap-1 w-full items-center"> {travelSearchData.travelDates && travelSearchData.travelDates.startDate && <BookingCalendar reserved={bookingReserved} />}</div> */}</div>
                  </Details>
                </div>
              </div>
            </div>
            <button type="submit" className={`bg-primary-green text-white rounded-full uppercase p-2 mt-5 ${error ? "opacity-50" : "opacity-100"}`}>
              Publish listing
            </button>
            {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>}
          </>
        )}
      </form>
    </div>
  );
}

function Details({ title, toggleState, toggleFunc, children }) {
  return (
    <div className="bg-comp-purple p-4 rounded-lg ">
      <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleFunc()}>
        <span className="uppercase font-semibold">{title}</span> {toggleState ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </h2>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${toggleState ? "scale-y-100 opacity-100 max-h-screen" : "scale-y-0 opacity-0 max-h-0"}`}>{children}</div>
    </div>
  );
}
