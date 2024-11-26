import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckboxInput, StringInput } from "../../Inputs";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader } from "../../Loaders";

//ADD SKELETONLOADER AND ERRORHANDLING

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

export default function SettingsForm() {
  const [user, setUser] = useState(null);
  const { userName, setVenueManager } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();
  // const [errorUpdateMessage, setErrorUpdateMessage] = useState("");
  const [userFeedbackUpdateMessage, setUserFeedbackUpdateMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(updateSettingsSchema) });

  useEffect(() => {
    if (!updateSuccess) {
      const fetchUserData = async () => {
        const result = await callApi(`/holidaze/profiles/${userName}?_venues=true&_bookings=true`);
        setUser(result.data);
      };
      fetchUserData();
    }
  }, []);

  const onSubmit = async (data) => {
    // setErrorUpdateMessage("");
    setUserFeedbackUpdateMessage("");
    try {
      await callApi(`/holidaze/profiles/${userName}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setUpdateSuccess(true);
      setVenueManager(data.venueManager);
      setUserFeedbackUpdateMessage("Profile successfully updated.");
    } catch (err) {
      console.log("error:", err);
      // setErrorUpdateMessage("Profile update failed: " + error);
    }
  };

  return (
    <>
      {user && (
        <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-2xl  uppercase text-primary-green">My settings</h1>
          </div>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <CheckboxInput disabled={scopedLoader} id="venueManager" innerText="Register as a venue manager" checked={user.venueManager} error={errors.venueManager} register={register} color="primary-green"></CheckboxInput>
            <StringInput disabled={scopedLoader} type="text" id="bio" label="Bio" placeholder="Something about you" defaultValue={user.bio} errorMessage={errors.bio && errors.bio.message} register={register} trigger={trigger} watch={watch}></StringInput>
            <div>
              <h2 className="mb-2 text-primary-green">Avatar</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <StringInput disabled={scopedLoader} type="url" id="avatar.url" label="Image url" placeholder="https://example.com/avatar.jpg" defaultValue={user.avatar.url} errorMessage={errors.avatar && errors.avatar.message} register={register} trigger={trigger} watch={watch}></StringInput>
                <StringInput disabled={scopedLoader} type="text" id="avatar.alt" label="Image description" placeholder="Something about the avatar image" defaultValue={user.avatar.alt} errorMessage={errors.avatar && errors.avatar.message} register={register} trigger={trigger} watch={watch}></StringInput>
              </div>
            </div>
            <div>
              <h2 className="mb-2  text-primary-green">Banner</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <StringInput disabled={scopedLoader} type="url" id="banner.url" label="Image url" placeholder="https://example.com/banner.jpg" defaultValue={user.banner.url} errorMessage={errors.banner && errors.banner.message} register={register} trigger={trigger} watch={watch}></StringInput>
                <StringInput disabled={scopedLoader} type="text" id="banner.alt" label="Image description" placeholder="Something about the banner image" defaultValue={user.banner.alt} errorMessage={errors.banner && errors.banner.message} register={register} trigger={trigger} watch={watch}></StringInput>
              </div>
            </div>
            <SquareBtn disabled={scopedLoader} type="submit" innerText="Save changes" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
            {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error ? error : userFeedbackUpdateMessage}</p>}
          </form>
        </div>
      )}
    </>
  );
}
