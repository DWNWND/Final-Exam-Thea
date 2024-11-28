import { useForm, FieldErrors, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApiCall } from "../../../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquareBtn } from "../../Buttons";
import { MdEmojiFoodBeverage, MdOutlinePets } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import { formatDateForDisplay, formatDateForFlatpickr } from "../../../utils";
import { SmallSpinnerLoader } from "../../Loaders";
import { Media } from "../../../types";

type Step0 = { name: string };
type Step1 = { description: string };
type Step2 = { price: number };
type Step3 = { maxGuests: number };
type Step4 = { rating: number };
type Step5 = {
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
};
type Step6 = {
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
};
type Step7 = {
  media: Media[];
};

type StepInputs = Step0 | Step1 | Step2 | Step3 | Step4 | Step5 | Step6 | Step7;

type SchemaList = [yup.Schema<Step0>, yup.Schema<Step1>, yup.Schema<Step2>, yup.Schema<Step3>, yup.Schema<Step4>, yup.Schema<Step5>, yup.Schema<Step6>, yup.Schema<Step7>];

type NewListingFormInputs = Step0 & Step1 & Step2 & Step3 & Step4 & Step5 & Step6 & Step7;

const newListingSchema: SchemaList = [
  yup.object().shape({
    name: yup.string().min(4, "Please enter a valid property name. Minimum 4 characters.").required("Property name is required"),
  }),
  yup.object().shape({
    description: yup.string().min(4, "Please enter a valid property description").required("Property description is required"),
  }),
  yup.object().shape({
    price: yup.number().min(1, "Please enter a valid property price per night").required("Property price per night is required"),
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
      zip: yup.string().min(1, "Please enter a valid zip").required("Property zip is required"),
      country: yup.string().min(3, "Please enter a valid property country").required("Property country is required"),
    }),
  }),
  yup.object().shape({
    meta: yup.object().shape({
      wifi: yup.boolean().required(),
      parking: yup.boolean().required(),
      breakfast: yup.boolean().required(),
      pets: yup.boolean().required(),
    }),
  }),
  yup.object().shape({
    media: yup
      .array()
      .of(
        yup.object().shape({
          url: yup.string().url("Please enter a valid URL").required("Image URL is required"),
          alt: yup.string().required("Description is required"),
        })
      )
      .default([]),
  }),
];

export default function NewListingForm(): JSX.Element {
  const { scopedLoader, error, callApi } = useApiCall();
  const [userFeedbackMessage, setUserFeedbackMessage] = useState<string>("");

  const [formStep, setFormStep] = useState<number>(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<NewListingFormInputs>>({});

  const todayString = formatDateForFlatpickr(new Date());
  const tomorrowString = formatDateForFlatpickr(new Date(new Date().setDate(new Date().getDate() + 1)));

  const startDate = new Date(todayString);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(tomorrowString);
  const formattedEndDate = formatDateForDisplay(endDate);

  const validFormStep = Math.min(formStep, newListingSchema.length - 1);
  const currentSchema = newListingSchema[validFormStep] as yup.ObjectSchema<StepInputs>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = useForm<StepInputs>({
    mode: "onChange",
    resolver: yupResolver(currentSchema),
    defaultValues: {
      media: [{ url: "", alt: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const nextStep = async (data: StepInputs) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setFormStep((cur) => cur + 1);
  };

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep((cur) => cur - 1);
    }
  };

  const onSubmit = async (data: StepInputs) => {
    const finalData = { ...formData, ...data };

    const processedData = {
      ...data,
      price: parseFloat(String(finalData.price)),
      maxGuests: parseInt(String(finalData.maxGuests), 10),
      rating: parseFloat(String(finalData.rating)),
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
          navigate(`/listing/${result.data.id}`);
        }
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const checkValidation = () => {
    if (formStep === 0) {
      const step0Errors = errors as FieldErrors<Step0>;
      return step0Errors.name?.message;
    }

    if (formStep === 1) {
      const step1Errors = errors as FieldErrors<Step1>;
      return step1Errors.description?.message;
    }

    if (formStep === 2) {
      const step2Errors = errors as FieldErrors<Step2>;
      return step2Errors.price?.message;
    }

    if (formStep === 3) {
      const step3Errors = errors as FieldErrors<Step3>;
      return step3Errors.maxGuests?.message;
    }

    if (formStep === 4) {
      const step4Errors = errors as FieldErrors<Step4>;
      return step4Errors.rating?.message;
    }

    if (formStep === 5) {
      const step5Errors = errors as FieldErrors<Step5>;

      if (step5Errors.location?.address) {
        return step5Errors.location?.address?.message;
      }

      if (step5Errors.location?.city) {
        return step5Errors.location?.city?.message;
      }

      if (step5Errors.location?.zip) {
        return step5Errors.location?.zip?.message;
      }

      if (step5Errors.location?.country) {
        return step5Errors.location?.country?.message;
      }
    }

    if (formStep === 7) {
      const step7Errors = errors as FieldErrors<Step7>;
      return step7Errors.media?.message;
    }
  };

  const errorCheck = checkValidation();

  return (
    <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        {formStep === 0 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What is the name of your property?</h2>
            <label htmlFor="name" className="block text-primary-green mb-2">
              Listing title
            </label>
            <input placeholder="Our magical cabin" id="name" {...register("name")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
          </section>
        )}
        {formStep === 1 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">Describe your property:</h2>
            <label htmlFor="description" className="block text-primary-green mb-2">
              Description
            </label>
            <textarea id="description" placeholder="Tucked away in the forest, our cabin is the perfect getaway..." {...register("description")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} rows={4} />
            {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
          </section>
        )}
        {formStep === 2 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What's your nightly price?</h2>
            <label htmlFor="price" className="block text-primary-green mb-2">
              NOK/night
            </label>
            <input placeholder="200" type="number" id="price" {...register("price")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
          </section>
        )}
        {formStep === 3 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">How many guests can you accommodate?</h2>
            <label htmlFor="maxGuests" className="block text-primary-green mb-2">
              Number of guests
            </label>
            <input placeholder="4" type="number" id="maxGuests" {...register("maxGuests")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
          </section>
        )}
        {formStep === 4 && (
          <section>
            <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">What is your property rating?</h2>
            <label htmlFor="rating" className="block text-primary-green mb-2">
              Rating number between 1-5
            </label>
            <input placeholder="5" type="number" id="rating" {...register("rating")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
            {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
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
                <input placeholder="44 holland drive" id="location.address" {...register("location.address")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
              </div>
              <div>
                <label htmlFor="location.city" className="block text-primary-green mb-2">
                  City
                </label>
                <input placeholder="New Amterdam" id="location.city" {...register("location.city")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
              </div>
              <div>
                <label htmlFor="location.zip" className="block text-primary-green mb-2">
                  Zip code
                </label>
                <input placeholder="10683" id="location.zip" {...register("location.zip")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
              </div>
              <div>
                <label htmlFor="location.country" className="block text-primary-green mb-2">
                  Country
                </label>
                <input placeholder="Holland" id="location.country" {...register("location.country")} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorCheck ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
              </div>
              {errorCheck && <p className="text-danger text-xs mt-1">{errorCheck}</p>}
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
              <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green md:mb-8">Add a image of your property:</h2>
              <div className="flex flex-col gap-8 mb-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-4 bg-comp-gray p-4 rounded-lg">
                    <label htmlFor={`media.${index}.url`} className="text-primary-green">
                      Image URL
                    </label>
                    <input {...register(`media.${index}.url`)} placeholder="Enter image URL" className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorCheck && "border-danger"}`} />
                    <label htmlFor={`media.${index}.alt`} className="text-primary-green">
                      Image Description
                    </label>
                    <input {...register(`media.${index}.alt`)} placeholder="Enter image description" className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errorCheck && "border-danger"}`} />
                    <button type="button" onClick={() => remove(index)} className="w-full border border-primary-green text-primary-green   py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Remove Media
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => append({ url: "", alt: "" })} className="w-full bg-white border border-primary-green text-primary-green py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add Media
                </button>
                {errorCheck && <p className="text-danger text-xs mt-2">{errorCheck}</p>}
              </div>
            </section>
          </>
        )}
        <div className="flex justify-between items-center">
          <SquareBtn innerText="Back" type="button" clickFunc={prevStep} disabled={formStep === 0} />
          <div className="flex justify-center gap-2 ">
            {newListingSchema.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${index <= formStep ? "bg-primary-green" : "bg-comp-green"}`}></div>
            ))}
          </div>
          <SquareBtn innerText="Next" type="button" clickFunc={nextStep} disabled={!isValid || formStep === 8} />
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
                    <img src={watch("media.0.url")} alt={watch("media.0.alt")} className="w-full h-96 md:h-[20rem] object-cover rounded-lg" />
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
                <div className="p-6 bg-white bg-opacity-70 border border-comp rounded-lg text-primary-blue mb-4">
                  <h3 className="uppercase font-semibold">Details</h3>
                  <p>{watch("description")}</p>
                </div>
                <div className=" p-6 bg-white bg-opacity-70 border border-comp rounded-lg text-primary-blue">
                  <h3 className="uppercase font-semibold">Amenities</h3>
                  <div className="flex flex-col mt-2 justify-between md:flex-row gap-4 md:gap-8">
                    <p className={`flex items-center gap-4 ${watch("meta.breakfast") ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                      <MdEmojiFoodBeverage />
                      Breakfast included
                    </p>
                    <p className={`flex items-center gap-4 ${watch("meta.parking") ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                      <FaParking />
                      Free parking
                    </p>
                    <p className={`flex items-center gap-4 ${watch("meta.pets") ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                      <MdOutlinePets />
                      Pets allowed
                    </p>
                    <p className={`flex items-center gap-4 ${watch("meta.wifi") ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                      <FaWifi />
                      Free WiFi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className={`bg-primary-green text-white rounded-full uppercase p-2 mt-5 ${error ? "opacity-50" : "opacity-100"}`}>
              Publish listing
            </button>
            {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error ? error : userFeedbackMessage}</p>}
          </>
        )}
      </form>
    </div>
  );
}
