// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { makeRequest } from "@/api";
// import swal from "sweetalert";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice"; // Ensure correct import path

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Form validation
//   const validateForm = () => {
//     let formErrors = {};
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     const nameRegex = /^[a-zA-Z\s]+$/;

//     if (!formData.firstName.trim()) {
//       formErrors.Firstname = "First name is required";
//     } else if (!nameRegex.test(formData.firstName)) {
//       formErrors.Firstname = "First name should contain only letters";
//     }

//     if (!formData.lastName.trim()) {
//       formErrors.lastName = "Last name is required";
//     } else if (!nameRegex.test(formData.lastName)) {
//       formErrors.lastName = "Last name should contain only letters";
//     }

//     if (!formData.email.trim()) {
//       formErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       formErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       formErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters long";
//     }

//     if (!formData.confirmPassword) {
//       formErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       formErrors.confirmPassword = "Passwords do not match";
//     }

//     return formErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       setIsLoading(true);
//       try {
//         const response = await makeRequest("POST", "/Authentication/Register", {
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           EmailId: formData.email,
//           Password: formData.password,
//         });

//         // Check the response from the API
//         if (response.code === 200 || response.code === 201) {
//           await swal("Success", "Registered Successfully! Please log in.", "success");

//           // Dispatch login action after registration
//           const userData = {
//             userId: response.userId || "",
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             designationId: response.designationId || null,
//             designationName: response.designationName || null,
//             accessToken: response.token || "",
//           };

//           dispatch(login(userData));
//           router.push("/"); // Redirect to homepage
//         } else if (response.code === 409) {
//           swal("Error", "Email already registered", "error");
//         } else {
//           swal("Error", "Registration failed. Please try again.", "error");
//         }
//       } catch (error) {
//         console.error("Registration error:", error);
//         swal("Error", "Network error occurred. Please try again.", "error");
//       } finally {
//         setIsLoading(false); // Ensure that loading state is reset after the API call
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
//       <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
//         <form onSubmit={handleSubmit}>
//           {/* First Name */}
//           <div className="mb-6">
//             <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your first name"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={isLoading}
//               required
//             />
//             {errors.Firstname && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
//           </div>

//           {/* Last Name */}
//           <div className="mb-6">
//             <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your last name"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={isLoading}
//               required
//             />
//             {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
//           </div>

//           {/* Email */}
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={isLoading}
//               required
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={isLoading}
//               required
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               disabled={isLoading}
//               required
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className={`w-full py-4 bg-green-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-6 ${
//               isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Registering..." : "Register"}
//           </button>

//           {/* Link to Signin */}
//           <div className="text-center mb-6">
//             <Link href="/login">
//               <span className="text-lg text-green-500 hover:underline">Already have an account? Log In</span>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeRequest } from "@/api";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Signup() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    EmailID: "",
    Password: "",
    Address: "",
    CountryId: "",
    StateId: "",
    CityId: "",
    MobileNumber: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch();

  const fetchCountries = async () => {
    try {
      const data = await makeRequest("POST", "/FormHelper/GetAllCountry");
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

  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.CountryId) return;
      try {
        const response = await makeRequest("POST", "/FormHelper/GetStatesByCountry", {
          CountryId: formData.CountryId,
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
  }, [formData.CountryId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.StateId) return;
      try {
        const data = await makeRequest("POST", "/FormHelper/GetCityByState", {
          StateId: formData.StateId,
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
  }, [formData.StateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.EmailID) newErrors.EmailID = "Email is required";
    if (!formData.Password) newErrors.Password = "Password is required";
    if (!formData.Address) newErrors.Address = "Address is required";
    if (!formData.CountryId) newErrors.CountryId = "Country is required";
    if (!formData.StateId) newErrors.StateId = "State is required";
    if (!formData.CityId) newErrors.CityId = "City is required";
    if (!formData.MobileNumber) newErrors.MobileNumber = "Mobile Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await makeRequest("POST", "/Authentication/Register", formData);
      console.log(formData);
      console.log("Response:", response);

      if (response.code === 200 || response.code === 201) {

        if(response.code==200 || response.message=="SUCCESS" || response.retval=="SUCCESS"){
          router.push('/VerifyEmail')


        } else{
          router.push("/register");
        }
        // Send OTP to the user's email
        const otpResponse = await makeRequest("POST", "/Authentication/SendOtpEmail", {
          email: formData.EmailID,
        });

        if (otpResponse.code === 200) {
          swal("Success", "OTP sent to your email. Please verify your email.", "success");
          router.push({
            pathname: "/VerifyEmail",
            query: { email: formData.EmailID },
          });
        } else {
          swal("Error", otpResponse.message || "Failed to send OTP.", "error");
        }
      } else {
        swal("Error", response.message || "Registration failed.", "error");
      }
    } catch (error) {
      swal("Error", "Network error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="FirstName" placeholder="First Name" onChange={handleChange} required />
          {errors.FirstName && <p className="text-red-500">{errors.FirstName}</p>}
          
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="LastName" placeholder="Last Name" onChange={handleChange} required />
          {errors.LastName && <p className="text-red-500">{errors.LastName}</p>}
          
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="EmailID" placeholder="Email" onChange={handleChange} required />
          {errors.EmailID && <p className="text-red-500">{errors.EmailID}</p>}
          
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" type="password" name="Password" placeholder="Password" onChange={handleChange} required />
          {errors.Password && <p className="text-red-500">{errors.Password}</p>}
          
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="Address" placeholder="Address" onChange={handleChange} required />
          {errors.Address && <p className="text-red-500">{errors.Address}</p>}
          
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="CountryId" onChange={handleChange} required>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.countryId} value={country.countryId}>{country.countryName +"  "+ country.countryEmoji}</option>
            ))}
          </select>
          {errors.CountryId && <p className="text-red-500">{errors.countryId}</p>}
          
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="StateId" onChange={handleChange} required disabled={!formData.CountryId}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.stateId} value={state.stateId}>{state.stateName}</option>
            ))}
          </select>
          {errors.StateId && <p className="text-red-500">{errors.stateId}</p>}
          
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="CityId" onChange={handleChange} required disabled={!formData.StateId}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
            ))}
          </select>
          {errors.CityId && <p className="text-red-500">{errors.cityId}</p>}
          
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" name="MobileNumber" placeholder="Mobile Number" onChange={handleChange} required />
          {errors.MobileNumber && <p className="text-red-500">{errors.MobileNumber}</p>}
          
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition" type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-green-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}