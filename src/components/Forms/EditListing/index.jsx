import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "../../Inputs/Checkbox";
import StringInput from "../../Inputs/String";
import useAuthStore from "../../../stores/useAuthStore.js";
import useApiCall from "../../../hooks/useApiCall.jsx";
import SquareBtn from "../../Buttons/SquareBtn";
import SmallLoader from "../../SmallLoader";
import usePut from "../../../hooks/usePut";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const url = import.meta.env.VITE_API_BASE_URL;

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

export default function EditListingForm() {
  const { id } = useParams();
  const { updateListing, loading, error } = usePut();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { userName, accessToken, setVenueManager } = useAuthStore();
  const { callApiWith } = useApiCall(accessToken);
  const navigate = useNavigate();
  const { data: singleVenueData, isLoading: singleVenueIsLoading, isError: singleVenueIsError } = useFetch(`${url}/holidaze/venues/${id}`);
  const venue = singleVenueData.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(editListingSchema) });

  // const fetchData = async () => {
  //   const response = await callApiWith(`${url}/holidaze/venues/${id}}`, {
  //     method: "GET",
  //   });
  //   setUser(response.data);
  //   console.log("response:", response);
  //   // setVenueManager(response.data.venueManager);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  //mockup:
  const handleDelete = async () => {
    // setLoading(true);
    try {
      // Simulate API call to delete user
      console.log("Deleting listing...");
      // Add your API call here
      setUserFeedbackMessage("listing deleted successfully.");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to delete listing.");
    } finally {
      // setLoading(false);
      setShowModal(false); // Close modal after action
    }
  };

  const onSubmit = async (data) => {
    // console.log("username:", data.userName);
    const result = await updateListing(data, `/holidaze/venues/${id}`);

    // Check if there was an error
    if (!loading && !error && result.success) {
      // Assume login returns an object with a success property
      // navigate(`/user/${userName}`);
      console.log("listing updated");
      setUserFeedbackMessage("Listing successfully updated");
      setErrorMessage("");
    } else if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
      setUserFeedbackMessage("");

      // Handle error feedback if necessary (optional)
      console.log("update listing failed:", result.error || error); // Log error for debugging
      console.log("error message", result.error.errors[0].message);
    }
  };

  return (
    <>
      {venue && (
        <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-2xl  uppercase text-primary-green">Edit listing</h1>
            <div className="underline hover:text-danger text-primary-light cursor-pointer" onClick={() => setShowModal(true)}>
              delete listing
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <StringInput type="text" id="name" label="Listing title" placeholder="Our magical cabin" defaultValue={venue.name} register={register} errorMessage={venue.name && venue.name.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="description" label="Description" placeholder="Tucked away in the forest, our cabin is the perfect getaway..." defaultValue={venue.description} register={register} errorMessage={venue.description && venue.description.message} trigger={trigger} watch={watch} />
            <StringInput type="number" id="price" label="NOK/night" placeholder="200" defaultValue={venue.price} register={register} errorMessage={venue.price && venue.price.message} trigger={trigger} watch={watch} />
            <StringInput type="number" id="maxGuests" label="Number of guests" placeholder="4" defaultValue={venue.maxGuests} register={register} errorMessage={venue.maxGuests && venue.maxGuests.message} trigger={trigger} watch={watch} />
            <StringInput type="number" id="rating" label="Rating number between 1-5" placeholder="5" defaultValue={venue.rating} register={register} errorMessage={venue.rating && venue.rating.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="location.address" label="Address" placeholder="44 holland drive" defaultValue={venue.location.address} register={register} errorMessage={venue.location.address && venue.location.address.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="location.city" label="City" placeholder="New Amterdam" defaultValue={venue.location.city} register={register} errorMessage={venue.location.city && venue.location.city.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="location.zip" label="Zip code" placeholder="10683" defaultValue={venue.location.zip} register={register} errorMessage={venue.location.zip && venue.location.zip.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="location.country" label="Country" placeholder="Holland" defaultValue={venue.location.country} register={register} errorMessage={venue.location.country && venue.location.country.message} trigger={trigger} watch={watch} />
            <div className="flex flex-col gap-3 mb-4">
              <h3 className="text-primary-green text-lg">Amenities</h3>
              <div className="flex gap-3 flex-col md:flex-row md:gap-8">
                <Checkbox id="meta.wifi" innerText="Free Wifi" checked={venue.meta.wifi} register={register} color="primary-green"></Checkbox>
                <Checkbox id="meta.parking" innerText="Free parking" checked={venue.meta.parking} register={register} color="primary-green"></Checkbox>
                <Checkbox id="meta.breakfast" innerText="Breakfast included" checked={venue.meta.breakfast} register={register} color="primary-green"></Checkbox>
                <Checkbox id="meta.pets" innerText="Pets allowed" checked={venue.meta.pets} register={register} color="primary-green"></Checkbox>
              </div>
            </div>
            <StringInput type="text" id="media[0].url" label="Image url" placeholder="https://www.example.com/image.jpg" defaultValue={venue.media[0].url} register={register} errorMessage={venue.media[0].url && venue.media[0].url.message} trigger={trigger} watch={watch} />
            <StringInput type="text" id="media[0].alt" label="Description" placeholder="Our magical cabin" defaultValue={venue.media[0].alt} register={register} errorMessage={venue.media[0].alt && venue.media[0].alt.message} trigger={trigger} watch={watch} />

            <SquareBtn clickFunc={handleSubmit(onSubmit)} type="submit" width="full" innerText="Save changes" tailw="hover:bg-white bg-opacity-50 mt-5" bgColor="white" textColor="primary-green" borderColor="primary-green" />

            {loading ? <SmallLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>}
          </form>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-primary-green">Are you sure you want to delete your profile?</h2>
            <p className="text-sm mb-6 text-primary-green">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <SquareBtn clickFunc={() => setShowModal(false)} type="button" width="full" innerText="No" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              <SquareBtn clickFunc={() => handleDelete()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white bg-opacity-50" bgColor="white" textColor="danger" borderColor="danger" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}