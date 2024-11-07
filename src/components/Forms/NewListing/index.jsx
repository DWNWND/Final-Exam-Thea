import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../../stores/useAuthStore.js";
import StringInput from "../../Inputs/String";
import Checkbox from "../../Inputs/Checkbox";
import useApiCall from "../../../hooks/useApiCall.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SquareBtn from "../../Buttons/SquareBtn";

const url = import.meta.env.VITE_API_VENUES_URL;

const schema = yup.object().shape({
  name: yup.string().min(4, "Please enter a valid property name").required("Property name is required"),
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

const formSteps = [
  {
    title: "What is the name of your property?",
    fields: [
      {
        id: "name",
        label: "Listing title",
        placeholder: "Our magical cabin",
        type: "text",
      },
    ],
  },
  {
    title: "Describe your property:",
    fields: [
      {
        id: "description",
        label: "Description",
        placeholder: "Tucked away in the forest, our cabin is the perfect getaway",
        type: "text",
      },
    ],
  },
  {
    title: "What's your nightly price?",
    fields: [
      {
        id: "price",
        label: "NOK/night",
        placeholder: "200",
        type: "number",
      },
    ],
  },
  {
    title: "How many guests can you accommodate?",
    fields: [
      {
        id: "maxGuests",
        label: "Number of guests",
        placeholder: "4",
        type: "number",
      },
    ],
  },
  {
    title: "What is your property rating?",
    fields: [
      {
        id: "rating",
        label: "Rating number between 1-5",
        placeholder: "4",
        type: "number",
      },
    ],
  },

  {
    title: "Where is the property located?",
    fields: [
      {
        id: "location.address",
        label: "Address",
        placeholder: "44 holland drive",
        type: "text",
      },
      {
        id: "location.city",
        label: "City",
        placeholder: "New Amsterdam",
        type: "text",
      },
      {
        id: "location.zip",
        label: "Zip",
        placeholder: "10683",
        type: "text",
      },
      {
        id: "location.country",
        label: "Country",
        placeholder: "Holland",
        type: "text",
      },
    ],
  },
  {
    title: "What amenities does your property have?",
    fields: [
      {
        id: "meta.wifi",
        label: "Free Wifi",
        type: "checkbox",
      },
      {
        id: "meta.parking",
        label: "Free parking",
        type: "checkbox",
      },
      {
        id: "meta.breakfast",
        label: "Breakfast included",
        type: "checkbox",
      },
      {
        id: "meta.pets",
        label: "Pets allowed",
        type: "checkbox",
      },
    ],
  },
  {
    title: "Add a image of your property:",
    fields: [
      {
        id: "media[0].url",
        label: "Image URL",
        placeholder: "https://example.com/image.jpg",
        type: "url",
      },
      {
        id: "media[0].alt",
        label: "Image description",
        placeholder: "Something about the image",
        type: "text",
      },
    ],
  },
  {
    title: "Review your listing",
    fields: [], // No fields in this step
  },
];

export default function NewListingForm() {
  const { accessToken } = useAuthStore();
  const { callApiWith, loading, error } = useApiCall(accessToken);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const currentGroup = formSteps[currentStep];
  const formData = watch();

  const onSubmit = async (data) => {
    console.log("data:", data);

    const response = await callApiWith(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("response:", response);

    if (!loading && !error) {
      navigate(`/venue/${response.data.id}`);
    }
  };
  const nextStep = async () => {
    const field = currentGroup.fields[currentStep];
    console.log("Validating field:", field.id);  // Log field being validated
    const isValid = await trigger(field.id);
    console.log("Validation result:", isValid);
  
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log(`Field ${field.id} has validation errors:`, errors[field.id]);
    }
  };

  
  // const nextStep = async () => {
  //   for (let i = 0; i < currentGroup.fields.length; i++) {
  //     if (!watch(currentGroup.fields[i].id)) {
  //       await trigger(currentGroup.fields[i].id); // Trigger validation only if the field has input
  //       return;
  //     }
  //     // console.log(`Validating field ${currentGroup.fields[i].id}`);
  //     // const isValid = await trigger(currentGroup.fields[i].id);
  //     // if (!isValid) {
  //     //   console.log(`Field ${currentGroup.fields[i].id} has validation errors:`, errors[currentGroup.fields[i].id]);
  //     //   return;
  //     // }
  //   }
  //   setCurrentStep((prev) => prev + 1); // Proceed to next step only if all validations pass
  // };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDotClick = async (index) => {
    if (index < currentStep) {
      // Allow backward navigation without validation
      setCurrentStep(index);
    } else if (index > currentStep) {
      // Only allow forward navigation if current step is valid
      const isValid = await trigger(currentGroup.fields.map((field) => field.id));
      if (isValid) {
        setCurrentStep(index);
      } else {
        console.log("Validation errors:", errors);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6 max-w-[50rem] w-full ml-auto mr-auto md:mt-16 justify-between mb-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">{currentGroup.title}</h2>

      {currentGroup.fields.map((field) => {
        if (field.type !== "checkbox") {
          return <StringInput key={field.id} type={field.type} id={field.id} label={field.label} placeholder={field.placeholder} error={errors[field.id]} register={register} />;
        } else {
          return <Checkbox key={field.id} id={field.id} innerText={field.label} checked={watch(field.id) || false} error={errors[field.id]} register={register} color="primary-green" />;
        }
      })}

      {currentStep === formSteps.length - 1 && (
        <div className="flex flex-col gap-2">
          <h3>Review your listing:</h3>
          <ul>
            {Object.entries(formData).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((item, index) => (
                  <li key={index}>
                    <strong>{key}:</strong>{" "}
                    {Object.entries(item).map(([subKey, subValue]) => (
                      <span key={subKey}>
                        {subKey}: {subValue.toString()}{" "}
                      </span>
                    ))}
                  </li>
                ));
              }
              if (typeof value === "object") {
                return Object.entries(value).map(([subKey, subValue]) => (
                  <li key={subKey}>
                    <strong>{subKey}:</strong> {subValue.toString()}
                  </li>
                ));
              } else {
                return (
                  <li key={key}>
                    <strong>{key}:</strong> {value.toString()}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center">
        <SquareBtn innerText="Back" type="button" clickFunc={prevStep} disabled={currentStep === 0} tailw={`${currentStep === 0 ? "opacity-0" : "opacity-100"} hover:bg-white bg-opacity-50`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />

        <div className="flex gap-3">
          {formSteps.map((_, index) => (
            <button type="button" key={index} onClick={() => handleDotClick(index)} className={`w-2 h-2 rounded-full transition ${currentStep === index ? "bg-primary-green" : "bg-comp-green"}`} />
          ))}
        </div>

        <SquareBtn innerText="Next" type="button" clickFunc={nextStep} disabled={currentStep === formSteps.length - 1} tailw={`hover:bg-white bg-opacity-50`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />
      </div>

      <div className="text-danger">{error}</div>

      {currentStep === formSteps.length - 1 && (
        <button type="submit" className="bg-primary-green text-white rounded-full uppercase p-2 mt-4">
          Publish listing
        </button>
      )}
    </form>
  );
}

// export default function NewListingForm() {
//   const { accessToken } = useAuthStore();
//   const { callApiWith, loading, error } = useApiCall(accessToken);
//   const [currentStep, setCurrentStep] = useState(0);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     trigger,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     console.log("data:", data);

//     const response = await callApiWith(url, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     console.log("response:", response);

//     if (!loading && !error) {
//       // Redirect to the newly created listing
//       navigate(`/venue/${response.data.id}`);
//     }
//   };

//   const nextStep = async () => {
//     // Trigger validation for the current step's fields
//     const isValid = await trigger(currentGroup.fields.map((field) => field.id));

//     if (isValid) {
//       // Only change step if validation is successful
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       console.log("There are validation errors:", errors);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const currentGroup = formSteps[currentStep];
//   const formData = watch();

//   return (
//     <form className="flex flex-col gap-6 max-w-[50rem] w-full ml-auto mr-auto md:mt-16 justify-between mb-6" onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="mb-1 mt-3 text-xl md:text-2xl text-center text-primary-green">{currentGroup.title}</h2>
//       {currentGroup.fields.map((field) => {
//         if (field.type !== "checkbox") {
//           return <StringInput key={field.id} type={field.type} id={field.id} label={field.label} placeholder={field.placeholder} error={errors[field.id]} register={register} />;
//         } else {
//           return <Checkbox key={field.id} id={field.id} innerText={field.label} checked={watch(field.id) || false} error={errors[field.id]} register={register} color="primary-green" />;
//         }
//       })}
//       {currentStep === formSteps.length - 1 && (
//         <>
//           <div className="flex flex-col gap-2">
//             <h3>Review your listing:</h3>
//             <ul>
//               {Object.entries(formData).map(([key, value]) => {
//                 if (Array.isArray(value)) {
//                   return value.map((item, index) => (
//                     <li key={index}>
//                       <strong>{key}:</strong>{" "}
//                       {Object.entries(item).map(([subKey, subValue]) => (
//                         <span key={subKey}>
//                           {subKey}: {subValue.toString()}{" "}
//                         </span>
//                       ))}
//                     </li>
//                   ));
//                 }
//                 if (typeof value === "object") {
//                   return Object.entries(value).map(([subKey, subValue]) => (
//                     <li key={subKey}>
//                       <strong>{subKey}:</strong> {subValue.toString()}
//                     </li>
//                   ));
//                 } else {
//                   return (
//                     <li key={key}>
//                       <strong>{key}:</strong> {value.toString()}
//                     </li>
//                   );
//                 }
//               })}
//             </ul>
//           </div>
//         </>
//       )}
//       <div className="flex justify-between items-center">
//         <SquareBtn innerText="Back" type="button" clickFunc={prevStep} disabled={currentStep === 0} tailw={`${currentStep === 0 ? "opacity-0" : "opacity-100"} hover:bg-white bg-opacity-50`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />
//         <div className="flex gap-3">
//           {formSteps.map((_, index) => (
//             <button
//               type="button"
//               key={index}
//               onClick={async () => {
//                 const isValid = await trigger(currentGroup.fields.map((field) => field.id));

//                 if (isValid) {
//                   setCurrentStep(index);
//                 }
//               }}

//               className={`w-2 h-2 rounded-full transition ${currentStep === index ? "bg-primary-green" : "bg-comp-green"}`}
//             />
//           ))}
//         </div>
//         <SquareBtn innerText="Next" type="button" clickFunc={nextStep} disabled={currentStep === formSteps.length - 1} tailw={`hover:bg-white bg-opacity-50`} bgColor="white" textColor="primary-green" borderColor="comp-primary-green" />
//       </div>
//       <div className="text-danger">{error}</div>
//       {currentStep === formSteps.length - 1 && (
//         <button type="submit" className="bg-primary-green text-white rounded-full uppercase p-2 mt-4">
//           Publish listing
//         </button>
//       )}
//     </form>
//   );
// }
