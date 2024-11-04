import { Helmet, HelmetProvider } from "react-helmet-async";
import StringInput from "../../../components/Inputs/String";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import useFetchUser from "../../../hooks/useFetchUser";
import useAuthStore from "../../../stores/useAuthStore";
import * as yup from "yup";

export default function MySettings() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My Settings | Holidayz</title>
      </Helmet>
      <main>
        <h1>My Settings</h1>
        <SettingsForm />
      </main>
    </HelmetProvider>
  );
}

// Validation schema for registration
// remeber to implement validation on email etc.
const updateSettingsSchema = yup.object().shape({
  userName: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  bio: yup.string().min(3, "Bio must be at least 3 characters").required("Bio is required"),
  avatar: yup.string().url("Please enter a valid url").required("Avatar url is required"),
  banner: yup.string().url("Please enter a valid url").required("Banner url is required"),
  venueManager: yup.boolean(),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
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
    console.log("username:", data.userName);

    if (!loading && !error) {
    }
  };

  //add more levels of userFeedback for the different errorcodes
  console.log("errors", error);

  return (
    <form>
      <StringInput type="text" id="userName" label="User name" placeholder={userName} error={errors.userName} register={register}></StringInput>
    </form>
  );
}
