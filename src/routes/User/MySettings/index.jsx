import { Helmet, HelmetProvider } from "react-helmet-async";
import StringInput from "../../../components/Inputs/String";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import useFetchUser from "../../../hooks/useFetchUser";
import useAuthStore from "../../../stores/useAuthStore";
import * as yup from "yup";
import Checkbox from "../../../components/Inputs/Checkbox";

export default function MySettings() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My Settings | Holidayz</title>
      </Helmet>
      <main className="pt-16 p-4">
        <h1 className="uppercase text-lg text-primary-blue mb-6">Profile settings</h1>
        <SettingsForm />
      </main>
    </HelmetProvider>
  );
}

// Validation schema for registration
// remeber to implement validation on email etc.
const updateSettingsSchema = yup.object().shape({
  // userName: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
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

const url = import.meta.env.VITE_API_BASE_URL;

function SettingsForm() {
  const [user, setUser] = useState(null);
  const { userName, accessToken } = useAuthStore();
  const { callApiWith, loading, error } = useFetchUser(accessToken);

  const fetchData = async () => {
    const response = await callApiWith(`${url}/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
      method: "GET",
    });
    setUser(response.data);
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

  // const login = useAuthStore((state) => state.login);

  const onSubmit = (data) => {
    console.log("sending form:", data);

    const sendData = async () => {
      const response = await callApiWith(`${url}/holidaze/profiles/${userName}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("response:", response);
      // setUser(response.data);
    };
    sendData();

    if (!loading && !error) {
    }
  };

  //add more levels of userFeedback for the different errorcodes
  return (
    <>
      {user && (
        <form className="flex flex-col gap-6">
          <Checkbox id="venueManager" innerText="Register as a venue manager" checked={user.venueManager} error={errors.venueManager} register={register} color="primary-green"></Checkbox>

          {/* <StringInput type="text" id="userName" label="User name" placeholder="Kari Normann" defaultValue={user.name} error={errors.userName} register={register}></StringInput>
          <StringInput typ="email" id="email" label="Contact email" placeholder="example@example.no" defaultValue={user.email} error={errors.email} register={register}></StringInput> */}
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
