import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import { SquareBtn } from "../../Buttons";
import { SmallSpinnerLoader, SettingsFormSkeletonLoader } from "../../Loaders";
import { UserSpesific } from "../../../types";

interface SettingsFormInputs {
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

const updateSettingsSchema = yup.object({
  bio: yup.string().min(3, "Bio must be at least 3 characters").required("Bio is required"),
  avatar: yup.object({
    url: yup.string().url("Please enter a valid url").required("Avatar url is required"),
    alt: yup.string().required("Description is required"),
  }),
  banner: yup.object({
    url: yup.string().url("Please enter a valid url").required("Banner url is required"),
    alt: yup.string().required("Description is required"),
  }),
  venueManager: yup.boolean().default(false),
});

export default function SettingsForm(): JSX.Element {
  const [user, setUser] = useState<UserSpesific | null>(null);
  const { userName, setVenueManager } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();
  const [userFeedbackUpdateMessage, setUserFeedbackUpdateMessage] = useState<string>("");
  // const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormInputs>({
    mode: "onChange",
    resolver: yupResolver(updateSettingsSchema),
  });

  const fetchUserData = async () => {
    try {
      const result = await callApi<UserSpesific>(`/holidaze/profiles/${userName}?_venues=true&_bookings=true`);
      if (result?.data) {
        setUser(result.data);
      } else {
        console.error("Error fetching user data:", result?.error);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSubmit = async (data: SettingsFormInputs) => {
    setUserFeedbackUpdateMessage("");
    try {
      await callApi(`/holidaze/profiles/${userName}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      // setUpdateSuccess(true);
      setVenueManager(data.venueManager);
      setUserFeedbackUpdateMessage("Profile successfully updated.");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
      {loading && <SettingsFormSkeletonLoader />}
      {user && (
        <div className="max-w-[50rem] mx-auto flex items-center flex-col m-4 p-8 bg-white rounded-lg shadow-sm w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-2xl uppercase text-primary-green">My settings</h1>
          </div>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <input disabled={scopedLoader} id="venueManager" type="checkbox" defaultChecked={user.venueManager} className="h-6 w-6 cursor-pointer" {...register("venueManager")} />
              <label htmlFor="venueManager" className={`ml-2 text-nowrap text-primary-green cursor-pointer`}>
                Register as a venue manager
              </label>
            </div>
            <div>
              <label htmlFor="bio" className="block text-primary-green mb-2">
                Bio
              </label>
              <input disabled={scopedLoader} type="text" placeholder="hSomething about you" id="bio" {...register("bio")} defaultValue={user.bio} className={`placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.bio?.message ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
              {errors.bio?.message && <p className="text-danger text-xs mt-2">{errors.bio?.message}</p>}
            </div>
            <div>
              <h2 className="mb-2 text-primary-green">Avatar</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <div>
                  <label htmlFor="avatar.url" className="block text-primary-green mb-2">
                    Image url
                  </label>
                  <input disabled={scopedLoader} type="url" placeholder="https://www.example.com/image.jpg" id="avatar.url" {...register("avatar.url")} defaultValue={user.avatar.url} className={`placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.avatar?.url?.message ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                </div>
                <div>
                  <label htmlFor="avatar.alt" className="block text-primary-green mb-2">
                    Description
                  </label>
                  <input disabled={scopedLoader} placeholder="Our magical cabin" id="avatar.alt" {...register("avatar.alt")} defaultValue={user.avatar.alt} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.avatar?.alt?.message ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                </div>
                {errors.avatar?.alt?.message && <p className="text-danger text-xs mt-2">{errors.avatar?.alt?.message}</p>}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-primary-green">Banner</h2>
              <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
                <div>
                  <label htmlFor="banner.url" className="block text-primary-green mb-2">
                    Image url
                  </label>
                  <input disabled={scopedLoader} type="url" placeholder="https://www.example.com/image.jpg" id="banner.url" {...register("banner.url")} defaultValue={user.banner.url} className={`placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.banner?.url?.message ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                </div>
                <div>
                  <label htmlFor="banner.alt" className="block text-primary-green mb-2">
                    Description
                  </label>
                  <input disabled={scopedLoader} placeholder="Our magical cabin" id="banner.alt" {...register("banner.alt")} defaultValue={user.banner.alt} className={`  placeholder:italic placeholder:font-light font-light text-primary-green border active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.banner?.alt?.message ? "border-danger" : "focus:border-primary-green active:border-primary-green"}`} />
                </div>
                {errors.banner?.alt?.message && <p className="text-danger text-xs mt-2">{errors.avatar?.alt?.message}</p>}
              </div>
            </div>
            <SquareBtn disabled={scopedLoader} type="submit" innerText="Save changes" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
            {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error || userFeedbackUpdateMessage}</p>}
          </form>
        </div>
      )}
    </>
  );
}
