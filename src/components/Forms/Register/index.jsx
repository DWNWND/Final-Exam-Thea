import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import { Link } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiRegisterExt = import.meta.env.VITE_API_REGISTER;
const apiKey = import.meta.env.VITE_VITE_API_KEY;

const registerUrl = apiBaseUrl + apiRegisterExt;

const apiLoginExt = import.meta.env.VITE_API_LOGIN;

const loginUrl = apiBaseUrl + apiLoginExt;


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

async function registerUser(name, email, password) {
  // const url = API_BASE + API_REGISTER;
  const response = await callApiWith(registerUrl, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  console.log("response", response);
  // if (response.status === 201) {
  //   login(email, password);
  //   return;
  // }

  // if (response.status === 400) {
  //   throw new Error("There is already an account with these credentials, try logging in instead.");
  // } else if (response.status >= 401) {
  //   throw new Error("An unexpected error occured, please try again later.");
  // }
}

async function login(email, password) {
  // const url = API_BASE + API_LOGIN;
  const response = await callApiWith(loginUrl, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const result = await response.json();
    const { accessToken, ...profile } = result.data;
    // save("token", accessToken);
    // save("profile", profile);

    console.log("User logged in:", profile);

    // const deployed = checkIfDeployed();
    // if (deployed) {
    //   location.pathname = `/${baseRepoUrl}`;
    // }
    // if (!deployed) {
    //   location.pathname = "/";
    // }
    return;
  }
  if (response.status === 401) {
    throw new Error("Email and/or password does not match.");
  } else if (response.status === 400 || response.status >= 402) {
    throw new Error("An error occured. Check that your credentials are correct or try again later.");
  }
}


// Validation schema for registration
const registerSchema = yup.object().shape({
  username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // const login = useAuthStore((state) => state.login);

  const onSubmit = (data) => {
    registerUser(data.username, data.email, data.password); // Simulate a successful registration
    login(data); // Log in the user after registration
  };

  return (
    <div className="max-w-md mx-auto px-8 pt-6 pb-8 mb-4  h-svh flex items-center flex-col justify-center">
      <h1 className="text-2xl mb-6 uppercase text-primary-green w-full">Register new user</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-primary-green mb-2">
            Username
          </label>
          <input type="text" id="username" placeholder="Your username" {...register("username")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "border-danger" : "border-primary-green"}`} />
          {errors.username && <p className="text-danger text-xs mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-primary-green mb-2">
            Email address
          </label>
          <input type="email" id="email" placeholder="example@example.com" {...register("email")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-danger" : "border-primary-green"}`} />
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-primary-green mb-2">
            Password
          </label>
          <input type="password" id="password" placeholder="********" {...register("password")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-danger" : "border-primary-green"}`} />
          {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-primary-green mb-2">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" placeholder="********" {...register("confirmPassword")} className={`placeholder:italic placeholder:font-light text-primary-green border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? "border-danger" : "border-primary-green"}`} />
          {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <CtaBtn type="submit" innerText="Register" tailw="mt-4 md:mt-0 rounded-full bg-primary-green" mainCta={true} color={"primary-green"} />
        </div>
      </form>
      <Link to="/login" className="w-full block text-sm underline mt-4 text-primary-green hover:text-primary-blue">
        Already have an account? Login
      </Link>
    </div>
  );
}
