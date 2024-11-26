import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckboxInput, StringInput } from "../../Inputs";
import { useAuthStore } from "../../../stores";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader, EditListingFormSkeletonLoader } from "../../Loaders";
import { useParams } from "react-router-dom";
import ErrorFallback from "../../ErrorFallback";
import { useApiCall } from "../../../hooks";
import { DeletionModal } from "../../Modals";

//think about adding possibility to edit email, username and password??
const editListingSchema = yup.object().shape({
  name: yup.string().min(4, "Please enter a valid property name. Minimum 4 characters.").required("Property name is required"),
  description: yup.string().min(4, "Please enter a valid property description").required("Property description is required"),
  price: yup.number().min(1, "Please enter a valid property price pr. night").required("Property price pr. night is required"),
  maxGuests: yup.number().min(1, "Please enter a valid property max guests").required("Property max guests is required"),
  rating: yup.number().min(1, "Please enter a valid rating 1-5").max(5, "Please enter a valid rating 1-5").required("Property rating is required"),
  location: yup.object().shape({
    address: yup.string().min(2, "Please enter a valid property address").required("Property address is required"),
    city: yup.string().min(2, "Please enter a valid city").required("Property city is required"),
    zip: yup.string().min(1, "Please enter a valid zip").required("Property zip id required"),
    country: yup.string().min(3, "Please enter a valid property country").required("Property country is required"),
  }),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  media: yup.array().of(
    yup.object().shape({
      url: yup.string().url("Please enter a valid url").required("Image url is required"),
      alt: yup.string().required("Description is required"),
    })
  ),
});

export default function EditListingForm({ setListingName }) {
  const { id } = useParams();
  const { userName } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  // const [errorUpdateMessage, setErrorUpdateMessage] = useState("");
  const [userFeedbackUpdateMessage, setUserFeedbackUpdateMessage] = useState("");
  const [deletionModal, setDeletionModal] = useState(false);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(editListingSchema) });

  useEffect(() => {
    const fetchListing = async () => {
      const result = await callApi(`/holidaze/venues/${id}`);
      setListing(result.data);
      setListingName(result.data.name);
    };
    fetchListing();
  }, []);

  const onSubmit = async (data) => {
    // setErrorUpdateMessage("");
    setUserFeedbackUpdateMessage("");

    try {
      await callApi(`/holidaze/venues/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      let countdown = 3;
      setUserFeedbackUpdateMessage(`Listing successfully updated. Redirecting back to profile in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackUpdateMessage(`Listing successfully updated. Redirecting back to profile in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          navigate(`/user/${userName}`);
        }
      }, 1000);
    } catch (err) {
      console.log("error:", err);
      // setErrorUpdateMessage(err.message);
    }
  };

  const toggleDeletionModal = () => setDeletionModal(!deletionModal);

  return (
    <>
      {loading ? (
        <EditListingFormSkeletonLoader />
      ) : (
        <>
          {error && error && <ErrorFallback errorMessage={error} />}
          {listing && (
            <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
              <div className="flex justify-between items-center w-full mb-6">
                <h1 className="text-2xl  uppercase text-primary-green">Edit listing</h1>
                <div className="underline hover:text-danger text-primary-light cursor-pointer" onClick={toggleDeletionModal}>
                  delete listing
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <StringInput disabled={scopedLoader} type="text" id="name" label="Listing title" placeholder="Our magical cabin" defaultValue={listing.name && listing.name} register={register} errorMessage={errors.name && errors.name.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="description" label="Description" placeholder="Tucked away in the forest, our cabin is the perfect getaway..." defaultValue={listing.description && listing.description} register={register} errorMessage={errors.description && errors.description.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="number" id="price" label="NOK/night" placeholder="200" defaultValue={listing.price} register={register} errorMessage={errors.price && errors.price.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="number" id="maxGuests" label="Number of guests" placeholder="4" defaultValue={listing.maxGuests && listing.maxGuests} register={register} errorMessage={errors.maxGuests && errors.maxGuests.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="number" id="rating" label="Rating number between 1-5" placeholder="5" defaultValue={listing.rating && listing.rating} register={register} errorMessage={errors.rating && errors.rating.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="location.address" label="Address" placeholder="44 holland drive" defaultValue={listing.location.address && listing.location.address} register={register} errorMessage={errors.location && errors.location.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="location.city" label="City" placeholder="New Amterdam" defaultValue={listing.location.city && listing.location.city} register={register} errorMessage={errors.location && errors.location.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="location.zip" label="Zip code" placeholder="10683" defaultValue={listing.location.zip && listing.location.zip} register={register} errorMessage={errors.location && errors.location.message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="location.country" label="Country" placeholder="Holland" defaultValue={listing.location.country && listing.location.country} register={register} errorMessage={errors.location && errors.location.message} trigger={trigger} watch={watch} />
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="text-primary-green text-lg">Amenities</h3>
                  <div className="flex gap-3 flex-col md:flex-row md:gap-8">
                    <CheckboxInput disabled={scopedLoader} id="meta.wifi" innerText="Free Wifi" checked={listing.meta.wifi && listing.meta.wifi} register={register} color="primary-green"></CheckboxInput>
                    <CheckboxInput disabled={scopedLoader} id="meta.parking" innerText="Free parking" checked={listing.meta.parking && listing.meta.parking} register={register} color="primary-green"></CheckboxInput>
                    <CheckboxInput disabled={scopedLoader} id="meta.breakfast" innerText="Breakfast included" checked={listing.meta.breakfast && listing.meta.breakfast} register={register} color="primary-green"></CheckboxInput>
                    <CheckboxInput disabled={scopedLoader} id="meta.pets" innerText="Pets allowed" checked={listing.meta.pets && listing.meta.pets} register={register} color="primary-green"></CheckboxInput>
                  </div>
                </div>
                <StringInput disabled={scopedLoader} type="text" id="media[0].url" label="Image url" placeholder="https://www.example.com/image.jpg" defaultValue={listing.media[0].url && listing.media[0].url} register={register} errorMessage={errors.media && errors.media[0].message} trigger={trigger} watch={watch} />
                <StringInput disabled={scopedLoader} type="text" id="media[0].alt" label="Description" placeholder="Our magical cabin" defaultValue={listing.media[0].alt && listing.media[0].alt} register={register} errorMessage={errors.media && errors.media[0].message} trigger={trigger} watch={watch} />
                <SquareBtn disabled={scopedLoader} clickFunc={handleSubmit(onSubmit)} type="submit" width="full" innerText="Save changes" tailw="hover:bg-white bg-opacity-50 mt-5" bgColor="white" textColor="primary-green" borderColor="primary-green" />
                {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error ? error : userFeedbackUpdateMessage}</p>}
              </form>
            </div>
          )}
          {deletionModal && <DeletionModal toggle={toggleDeletionModal} loading={scopedLoader} />}
        </>
      )}
    </>
  );
}
