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

const url = import.meta.env.VITE_API_BASE_URL;

//think about adding possibility to edit email, username and password??
const updateSettingsSchema = yup.object().shape({
  bio: yup.string().min(3, "Bio must be at least 3 characters").required("Bio is required"),
  avatar: yup.object().shape({
    url: yup.string().url("Please enter a valid url").required("Avatar url is required"),
    alt: yup.string().required("Description is required"),
  }),
  banner: yup.object().shape({
    url: yup.string().url("Please enter a valid url").required("Banner url is required"),
    alt: yup.string().required("Description is required"),
  }),
  venueManager: yup.boolean(),
});

//the api does not open for deleting users, so this is just a mockup

export default function SettingsForm() {
  const { updateProfile, loading, error } = usePut();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { userName, accessToken, setVenueManager } = useAuthStore();
  const { callApiWith } = useApiCall(accessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(updateSettingsSchema) });

  const fetchData = async () => {
    const response = await callApiWith(`${url}/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
      method: "GET",
    });
    setUser(response.data);
    console.log("response:", response);
    // setVenueManager(response.data.venueManager);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    // setLoading(true);
    try {
      // Simulate API call to delete user
      console.log("Deleting user...");
      // Add your API call here
      setUserFeedbackMessage("User deleted successfully.");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to delete user.");
    } finally {
      // setLoading(false);
      setShowModal(false); // Close modal after action
    }
  };

  const onSubmit = async (data) => {
    console.log("username:", data.userName);
    const result = await updateProfile(data, `/holidaze/profiles/${userName}`);

    // Check if there was an error
    if (!loading && !error && result.success) {
      // Assume login returns an object with a success property
      console.log("profile updated");
      setVenueManager(data.venueManager);
      setErrorMessage("");
      setUserFeedbackMessage("Profile successfully updated");
      navigate(`/user/${userName}`);
    } else if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
      setUserFeedbackMessage("");

      // Handle error feedback if necessary (optional)
      console.log("update profile failed:", result.error || error); // Log error for debugging
      console.log("error message", result.error.errors[0].message);
    }
  };

  return (
    <>
      {user && (
        <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-2xl  uppercase text-primary-green">My settings</h1>
            <div className="underline hover:text-danger text-primary-light cursor-pointer" onClick={() => setShowModal(true)}>
              delete user
            </div>
          </div>
          <form className="flex flex-col gap-6 w-full">
            <Checkbox id="venueManager" innerText="Register as a venue manager" checked={user.venueManager} error={errors.venueManager} register={register} color="primary-green"></Checkbox>
            <StringInput type="text" id="bio" label="Bio" placeholder="Something about you" defaultValue={user.bio} errorMessage={errors.bio && errors.bio.message} register={register} trigger={trigger} watch={watch}></StringInput>
            <div>
              <h2 className="mb-2 text-primary-green">Avatar</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <StringInput type="url" id="avatar.url" label="Image url" placeholder="https://example.com/avatar.jpg" defaultValue={user.avatar.url} errorMessage={errors.avatar && errors.avatar.message} register={register} trigger={trigger} watch={watch}></StringInput>
                <StringInput type="text" id="avatar.alt" label="Image description" placeholder="Something about the avatar image" defaultValue={user.avatar.alt} errorMessage={errors.avatar && errors.avatar.message} register={register} trigger={trigger} watch={watch}></StringInput>
              </div>
            </div>
            <div>
              <h2 className="mb-2  text-primary-green">Banner</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <StringInput type="url" id="banner.url" label="Image url" placeholder="https://example.com/banner.jpg" defaultValue={user.banner.url} errorMessage={errors.banner && errors.banner.message} register={register} trigger={trigger} watch={watch}></StringInput>
                <StringInput type="text" id="banner.alt" label="Image description" placeholder="Something about the banner image" defaultValue={user.banner.alt} errorMessage={errors.banner && errors.banner.message} register={register} trigger={trigger} watch={watch}></StringInput>
              </div>
            </div>
            <SquareBtn clickFunc={handleSubmit(onSubmit)} type="submit" innerText="Save changes" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
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
