import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiLoginExt = import.meta.env.VITE_API_LOGIN;
const apiKey = import.meta.env.VITE_VITE_API_KEY;

const url = apiBaseUrl + apiLoginExt;

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

async function callApiWith(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
}

function headers(hasBody = false) {
  const headers = new Headers();
  // const token = load("token");

  // if (token) {
  //   headers.append("Authorization", `Bearer ${token}`);
  // }
  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }
  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
}

async function login(email, password) {
  // const url = API_BASE + API_LOGIN;
  const response = await callApiWith(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const result = await response.json();
    const { accessToken, ...profile } = result.data;
    // save("token", accessToken);
    // save("profile", profile);

    // console.log("accessToken", accessToken);

    // console.log("User logged in:", profile);

    // const deployed = checkIfDeployed();
    // if (deployed) {
    //   location.pathname = `/${baseRepoUrl}`;
    // }
    // if (!deployed) {
    //   location.pathname = "/";
    // }
    return accessToken;
  }
  if (response.status === 401) {
    throw new Error("Email and/or password does not match.");
  } else if (response.status === 400 || response.status >= 402) {
    throw new Error("An error occured. Check that your credentials are correct or try again later.");
  }
}

export default function LoginForm() {
  const { setAccessToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const accessToken = await login(data.email, data.password);
    console.log("accessToken", accessToken);
    setAccessToken(accessToken);
  };

  return (
    <div className="max-w-md mx-auto px-8 pt-6 pb-8 mb-4 h-svh flex items-center flex-col justify-center">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Login</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-primary-green mb-2">
            Email address
          </label>
          <input placeholder="example@example.com" type="email" id="email" {...register("email")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-danger" : "border-primary-green"}`} />
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-primary-green mb-2">
            Password
          </label>
          <input placeholder="********" type="password" id="password" {...register("password")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-danger" : "border-primary-green"}`} />
          {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <CtaBtn type="submit" innerText="Login" tailw="mt-4 md:mt-0 rounded-full bg-primary-green" mainCta={true} color={"primary-green"}></CtaBtn>
        </div>
      </form>
      <Link to="/#" className=" w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Forgot your password?
      </Link>
      <Link to="/register" className=" w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Register new user
      </Link>
    </div>
  );
}
