import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "../../Inputs/Checkbox";
import StringInput from "../../Inputs/String";
import useAuthStore from "../../../stores/useAuthStore.js";
import useFetchUser from "../../../hooks/useApiCall.jsx";

const url = import.meta.env.VITE_API_BASE_URL;

//think about adding possibility to edit email, username and password
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
  const { userName, accessToken, setVenueManager } = useAuthStore();
  const { callApiWith, loading, error } = useFetchUser(accessToken);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await callApiWith(`${url}/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
      method: "GET",
    });
    setUser(response.data);
    setVenueManager(response.data.venueManager);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSettingsSchema),
  });

  const onSubmit = (data) => {
    const sendData = async () => {
      const response = await callApiWith(`${url}/holidaze/profiles/${userName}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("response:", response);
    };
    sendData();

    if (!loading && !error) {
      navigate(`/user/${userName}`);
    }
  };

  //add more levels of userFeedback for the different errorcodes
  return (
    <>
      {user && (
        <form className="flex flex-col gap-6">
          <Checkbox id="venueManager" innerText="Register as a venue manager" checked={user.venueManager} error={errors.venueManager} register={register} color="primary-green"></Checkbox>
          <StringInput type="text" id="bio" label="Bio" placeholder="Something about you" defaultValue={user.bio} error={errors.bo} register={register}></StringInput>
          <div>
            <h2 className="mb-2 text-primary-green">Avatar</h2>
            <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
              <StringInput type="url" id="avatar.url" label="Image url" placeholder="https://example.com/avatar.jpg" defaultValue={user.avatar.url} error={errors.avatar} register={register}></StringInput>
              <StringInput type="text" id="avatar.alt" label="Image description" placeholder="Something about the avatar image" defaultValue={user.avatar.alt} error={errors.avatar} register={register}></StringInput>
            </div>
          </div>
          <div>
            <h2 className="mb-2  text-primary-green">Banner</h2>
            <div className="flex flex-col gap-4 bg-comp-gray p-4 rounded-xl">
              <StringInput type="url" id="banner.url" label="Image url" placeholder="https://example.com/banner.jpg" defaultValue={user.banner.url} error={errors.banner} register={register}></StringInput>
              <StringInput type="text" id="banner.alt" label="Image description" placeholder="Something about the banner image" defaultValue={user.banner.alt} error={errors.banner} register={register}></StringInput>
            </div>
          </div>
          <button onClick={handleSubmit(onSubmit)} className="bg-primary-green text-white rounded-full uppercase p-2">
            Save changes
          </button>
          <div className="text-danger">{error}</div>
          <div className="underline text-center mb-8">Delete user</div>
        </form>
      )}
    </>
  );
}
