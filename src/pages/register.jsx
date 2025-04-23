import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeRequest } from "@/api";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const validationSchema = Yup.object({
  FirstName: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  EmailID: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  Address: Yup.string().required("Address is required"),
  CountryId: Yup.string().required("Country is required"),
  StateId: Yup.string().required("State is required"),
  CityId: Yup.string().required("City is required"),
  MobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile Number is required"),
});

export default function Register() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    FirstName: "",
    LastName: "",
    EmailID: "",
    Password: "",
    Address: "",
    CountryId: "",
    StateId: "",
    CityId: "",
    MobileNumber: "",
  };

  const fetchCountries = async () => {
    try {
      const data = await makeRequest("GET", "/FormHelper/GetAllCountry");
      if (data.code === 200) {
        setCountries(data.countryEntities?.$values || []);
      } else {
        swal("Error", "Failed to get Countries", "error");
      }
    } catch (error) {
      swal("Error", "Network Issue: Failed to get Countries", "error");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await makeRequest("POST", "/Authentication/Register", values);

      if (response.code === 200 || response.code === 201) {
        if (
          response.code === 200 ||
          response.message === "SUCCESS" ||
          response.retval === "SUCCESS"
        ) {
          // Send OTP to the user's email
          const otpResponse = await makeRequest("POST", "/Authentication/SendOtpEmail", {
            email: values.EmailID,
          });

          if (otpResponse.code === 200) {
            swal("Success", "OTP sent to your email. Please verify your email.", "success");
            router.push({
              pathname: "/VerifyEmail",
              query: { email: values.EmailID },
            });
          } else {
            swal("Error", otpResponse.message || "Failed to send OTP.", "error");
          }
        } else {
          router.push("/register");
        }
      } else {
        swal("Error", response.message || "Registration failed.", "error");
      }
    } catch (error) {
      swal("Error", "Network error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <>
              {/* Move useEffect hooks inside Formik render prop to access values */}
              {useEffect(() => {
                const fetchStates = async () => {
                  if (!values.CountryId) {
                    setStates([]);
                    return;
                  }
                  try {
                    const response = await makeRequest("POST", "/FormHelper/GetStatesByCountry", {
                      CountryId: values.CountryId,
                    });
                    if (response.code === 200) {
                      setStates(response.stateEntities?.$values || []);
                    } else {
                      swal("Error", "Failed to get States", "error");
                    }
                  } catch (error) {
                    console.error("Error fetching states:", error);
                    swal("Error", "Network Issue: Failed to get States", "error");
                  }
                };

                fetchStates();
              }, [values.CountryId])}

              {useEffect(() => {
                const fetchCities = async () => {
                  if (!values.StateId) {
                    setCities([]);
                    return;
                  }
                  try {
                    const data = await makeRequest("POST", "/FormHelper/GetCityByState", {
                      StateId: values.StateId,
                    });
                    if (data.code === 200) {
                      setCities(data.cityEntities?.$values || []);
                    } else {
                      swal("Error", "Failed to get Cities", "error");
                    }
                  } catch (error) {
                    console.error("Error fetching cities:", error);
                    swal("Error", "Network Issue: Failed to get Cities", "error");
                  }
                };

                fetchCities();
              }, [values.StateId])}

              <Form className="space-y-4">
                <div>
                  <Field
                    name="FirstName"
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="FirstName" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    name="LastName"
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="LastName" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    name="EmailID"
                    type="email"
                    placeholder="Email"
                    autoComplete="new-email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="EmailID" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    name="Password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="Password" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    name="Address"
                    placeholder="Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="Address" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="CountryId"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    onChange={(e) => {
                      setFieldValue("CountryId", e.target.value);
                      setFieldValue("StateId", "");
                      setFieldValue("CityId", "");
                      setStates([]);
                      setCities([]);
                    }}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.countryId} value={country.countryId}>
                        {country.countryName + " " + country.countryEmoji}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="CountryId" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="StateId"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    disabled={!values.CountryId}
                    onChange={(e) => {
                      setFieldValue("StateId", e.target.value);
                      setFieldValue("CityId", "");
                      setCities([]);
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.stateId} value={state.stateId}>
                        {state.stateName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="StateId" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="CityId"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    disabled={!values.StateId}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="CityId" component="p" className="text-red-500" />
                </div>

                <div>
                  <Field
                    name="MobileNumber"
                    placeholder="Mobile Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage name="MobileNumber" component="p" className="text-red-500" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </Form>
            </>
          )}
        </Formik>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}