import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { makeRequest } from "@/api";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [cartLength, setLength] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);
  const [deliverydata, setDeliveryData] = useState([]);
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-lg font-medium text-gray-600"
      >
        Loading your cart...
      </motion.p>
    </div>
  );

  const CalculateDeliveryCharge = (data) => {
    let totalDeliveryCharges = 0;

    data.forEach((item) => {
      const quantity = parseInt(item.quantity || 1);
      const length = parseFloat(item.packageLength || 0);
      const width = parseFloat(item.packageWidth || 0);
      const height = parseFloat(item.packageHeight || 0);
      const weight = parseFloat(item.packageWeight || 0);

      const volumetricWeight = (length * width * height) / 5000;
      const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

      let deliveryChargePerUnit = 90;
      if (finalWeightPerUnit > 2000) {
        const extraWeight = finalWeightPerUnit - 2000;
        const extraKg = Math.ceil(extraWeight / 1000);
        deliveryChargePerUnit += extraKg * 35;
      }

      const gst = deliveryChargePerUnit * 0.18;
      const totalPerUnit = deliveryChargePerUnit + gst;

      totalDeliveryCharges += totalPerUnit;
    });

    return Math.round(totalDeliveryCharges);
  };

  const GetCartData = async (retries = 2) => {
    setLoading(true);
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setLoading(false);
      Swal.fire({
        title: "Session Expired",
        text: "Please log in to view your cart.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      router.push("/login");
      return;
    }

    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
        const cartItems = response[0].dataset.$values;
        setLength(cartItems.length);
        setData(cartItems);
        setDeliveryData(cartItems);
      } else {
        setLength(0);
        setData([]);
        setDeliveryData([]);
      }
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return GetCartData(retries - 1);
      }
      setLength(0);
      setData([]);
      setDeliveryData([]);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch cart data.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkPincodeAvailability = async (pin) => {
    if (!pin || pin.length !== 6 || !deliverydata.length) {
      setAvailability({
        available: false,
        message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
      });
      setIsPincodeValid(false);
      return;
    }

    try {
      const response = await makeRequest(
        "GET",
        `/Order/GetServiceAvailability?pincode=${pin}`
      );

      if (response.retval === "SUCCESS") {
        const charges = CalculateDeliveryCharge(deliverydata);
        setAvailability({
          available: true,
          deliveryDate: getDeliveryDatePlus8Days(),
          deliveryCharge: charges,
        });
        setIsPincodeValid(true);
      } else {
        setAvailability({
          available: false,
          message: "Delivery not available for this pincode",
        });
        setIsPincodeValid(false);
      }
    } catch (error) {
      setAvailability({
        available: false,
        message: "Error checking availability",
      });
      setIsPincodeValid(false);
    }
  };

  const getDeliveryDatePlus8Days = () => {
    const date = new Date();
    date.setDate(date.getDate() + 8);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchAddresses = async () => {
    const storedToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    try {
      const response = await makeRequest(
        "POST",
        "/Authentication/GetUserProfile",
        { UserId: userId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      const addressData = response?.userProfilesEntity?.$values || [];
      const formattedAddresses = addressData
        .flatMap((addr) => {
          const addressList = [
            { address: addr.address, pincode: addr.pincode, isDefault: true },
            { address: addr.addressOne, pincode: addr.pincode1 },
            { address: addr.addressTwo, pincode: addr.pincode2 },
            { address: addr.address_Three, pincode: addr.pincode3 },
            { address: addr.address_Four, pincode: addr.pincode4 },
          ];
          return addressList
            .map((item, index) => ({
              ...item,
              id: index + 1,
              fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
            }))
            .filter((item) => item.fullAddress);
        });

      setAddresses(formattedAddresses);
      if (formattedAddresses.length > 0) {
        setSelectedAddress(1);
        try {
          await makeRequest(
            "POST",
            "/Authentication/UpdateAddressIndex",
            { UserId: userId, SelectedAddressBlock: 1 },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
        } catch (error) {
          console.error("Error setting default address index:", error);
        }
      } else {
        setSelectedAddress(null);
        setIsPincodeValid(false);
        setAvailability({
          available: false,
          message: "No addresses available",
        });
      }
    } catch (error) {
      setAddresses([]);
      setSelectedAddress(null);
      setIsPincodeValid(false);
      setAvailability({
        available: false,
        message: "Error fetching addresses",
      });
    }
  };

  const handleAddAddress = async (values, { resetForm }) => {
    const storedToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const nextIndex = addresses.length + 1;

    if (nextIndex > 5) {
      Swal.fire({
        title: "Error",
        text: "Maximum of 5 addresses allowed.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const response = await makeRequest(
        "POST",
        "/Authentication/EditAddressPincode",
        {
          UserId: userId,
          SelectedAddressBlock: nextIndex,
          Address: values.address,
          pincode: values.pincode,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response.retval === "SUCCESS") {
        await fetchAddresses();
        setSelectedAddress(nextIndex);
        setIsAddAddressModalOpen(false);
        resetForm();
        Swal.fire({
          title: "Success",
          text: "Address added successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add address.",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add address.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await GetCartData();
      await fetchAddresses();
      if (addresses.length > 0 && deliverydata.length > 0) {
        const initialAddress = addresses.find((addr) => addr.id === 1);
        if (initialAddress) {
          await checkPincodeAvailability(initialAddress.pincode);
        }
      }
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
      const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
      if (selectedAddr) {
        checkPincodeAvailability(selectedAddr.pincode);
        try {
          const storedToken = localStorage.getItem("authToken");
          makeRequest(
            "POST",
            "/Authentication/UpdateAddressIndex",
            { UserId: localStorage.getItem("userId"), SelectedAddressBlock: selectedAddress },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
        } catch (error) {
          console.error("Error updating address index:", error);
        }
      }
    }
  }, [addresses, deliverydata, selectedAddress]);

  const handleAddressSelect = async (addressId) => {
    setSelectedAddress(addressId);
    setIsAddressModalOpen(false);
  };

  const addressValidationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  });

  const totalQuantity = data?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  ) || 0;
  const totalPrice = data?.reduce((total, item) => {
    const price = parseFloat(item.pricing) || 0;
    const qty = item.quantity || 0;
    return total + price * qty;
  }, 0) || 0;

  const ActualPrice = data?.reduce((total, item) => {
    const qty = item.quantity || 1;
    const calculatePrice = item.calculatedPrice || 0;
    return total + calculatePrice * qty;
  }, 0) || 0;

  const discount = data?.reduce((total, item) => {
    const discountAmt = parseFloat(item.discountAmount) || 0;
    const qty = item.quantity || 0;
    if (item.discountType === "Flat") {
      return total + discountAmt * qty;
    } else if (item.discountType === "Percentage") {
      const price = parseFloat(item.calculatedPrice) || 0;
      return total + ((price * discountAmt) / 100) * qty;
    }
    return total;
  }, 0) || 0;

  const deliveryCharge = CalculateDeliveryCharge(data);
  const totalAmount = ActualPrice + deliveryCharge;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProductDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const handlePlaceOrder = async () => {
    if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
      Swal.fire({
        title: "Cannot Place Order",
        text: "Please select a valid address with available delivery.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const selectedAddressObj = addresses.find(
      (addr) => addr.id === selectedAddress
    );
    const cartItems = data;

    const storedToken = localStorage.getItem("authToken");
    const variantIDs = cartItems.map(
      (item) => `${item.varientsId},${item.quantity}`
    );

    const payload = {
      varientID: variantIDs,
      DeliveryAddress: selectedAddressObj.fullAddress,
    };

    try {
      const response = await makeRequest("POST", "Order/CreateOrder", payload, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (!response || !response.dataset || !response.dataset.orderDetails) {
        Swal.fire({
          title: "Order Creation Failed",
          text: "No order details returned",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      const orderDetails = response.dataset.orderDetails;
      const { id: order_id, amount, currency } = orderDetails;

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        Swal.fire({
          title: "Failed to Load Razorpay",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Mahaagromart",
        description: "Order Payment",
        order_id,
        handler: async (response) => {
          const paymentVerification = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyResponse = await makeRequest(
              "POST",
              "Order/VerifyPayment",
              paymentVerification,
              {
                headers: { Authorization: `Bearer ${storedToken}` },
              }
            );

            if (verifyResponse) {
              for (const item of cartItems) {
                await handleDeleteItem(
                  item.varientsId,
                  item.productId,
                  item.minimumOrderQuantity
                );
              }
              Swal.fire({
                title: "Payment Successful!",
                text: "Your order has been placed.",
                icon: "success",
                confirmButtonColor: "#2563eb",
              });
              router.push("/Ordertrack");
            } else {
              Swal.fire({
                title: "Payment Verification Failed!",
                icon: "error",
                confirmButtonColor: "#2563eb",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Payment Verification Error",
              icon: "error",
              confirmButtonColor: "#2563eb",
            });
          }
        },
        prefill: {
          name: `${localStorage.getItem("firstName")} ${localStorage.getItem(
            "lastName"
          )}`,
          email: localStorage.getItem("email") || "mahaagromart.com",
          contact: localStorage.getItem("phone") || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", () => {
        Swal.fire({
          title: "Payment Failed!",
          text: "Please try again.",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      });

      razorpay.open();
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong!",
        text: "Unable to place the order.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
    setDeletingId(VARIENTS_ID);
    const storedToken = localStorage.getItem("authToken");
    const UserId = localStorage.getItem("userId");

    try {
      const response = await makeRequest(
        "POST",
        "/Cart/UpdateCartData",
        { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
        Swal.fire({
          title: "Success",
          text: "Item removed from cart",
          icon: "success",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          GetCartData();
          setDeletingId(null);
        });
      } else {
        setDeletingId(null);
        Swal.fire({
          title: "Failed to Remove Item",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      setDeletingId(null);
      Swal.fire({
        title: "Network Issue",
        text: "Failed to remove item",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Address Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              <FaMapMarkerAlt className="mr-2" />
              Change Address
            </motion.button>
          </div>

          {addresses.length > 0 && selectedAddress !== null ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-2xl bg-blue-50 border border-blue-200"
            >
              <div className="flex items-start">
                <motion.div
                  className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold text-gray-900">Selected Address</h3>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
                        ? "Default"
                        : `Address ${selectedAddress}`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{addresses.find((addr) => addr.id === selectedAddress)?.address}</p>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1 text-blue-500" />
                    Pincode: <span className="font-medium ml-1">{addresses.find((addr) => addr.id === selectedAddress)?.pincode}</span>
                  </div>
                  {availability && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-1 text-sm font-medium ${availability.available ? "text-green-600" : "text-red-600"}`}
                    >
                      {availability.available
                        ? `Expected delivery by ${availability.deliveryDate}`
                        : availability.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <FaMapMarkerAlt className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600 font-medium text-sm">No addresses found</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddAddressModalOpen(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto text-sm"
              >
                <FaPlus className="mr-1" /> Add New Address
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* Address Selection Modal */}
        <AnimatePresence>
          {isAddressModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-hidden shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsAddressModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <motion.div
                        key={address.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                          selectedAddress === address.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                              selectedAddress === address.id
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAddress === address.id && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-gray-900">Address {address.id}</h3>
                              {address.isDefault && (
                                <span className="ml-3 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-700">{address.address}</p>
                            <div className="mt-1 flex items-center text-sm text-gray-600">
                              <FaMapMarkerAlt className="w-4 h-4 mr-1 text-blue-500" />
                              Pincode: <span className="font-medium">{address.pincode}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                      <FaMapMarkerAlt className="w-10 h-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-600 font-medium text-sm">No addresses found</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsAddressModalOpen(false);
                          setIsAddAddressModalOpen(true);
                        }}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto text-sm"
                      >
                        <FaPlus className="mr-1" /> Add New Address
                      </motion.button>
                    </div>
                  )}
                </div>
                {addresses.length < 5 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsAddressModalOpen(false);
                      setIsAddAddressModalOpen(true);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center text-sm"
                  >
                    <FaPlus className="mr-1" /> Add New Address
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Address Modal */}
        <AnimatePresence>
          {isAddAddressModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsAddAddressModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </motion.button>
                </div>
                <Formik
                  initialValues={{ address: "", pincode: "" }}
                  validationSchema={addressValidationSchema}
                  onSubmit={handleAddAddress}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your full address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                          Pincode
                        </label>
                        <Field
                          type="text"
                          name="pincode"
                          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter 6-digit pincode"
                        />
                        <ErrorMessage
                          name="pincode"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setIsAddAddressModalOpen(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                        >
                          Save Address
                        </motion.button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {data?.length > 0 ? (
              <ul className="space-y-6">
                <AnimatePresence>
                  {data.map((item) => (
                    <motion.li
                      key={item.varientsId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div
                        className="flex items-center w-full sm:w-1/2 cursor-pointer"
                        onClick={() => handleProductDetails(item.productId)}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
                          alt={item.productName || "Product"}
                          width={120}
                          height={120}
                          className="object-cover rounded-xl shadow-sm"
                        />
                        <div className="ml-4 space-y-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {item.productName || "Unnamed Product"}
                          </h3>
                          <p className="text-sm text-gray-500">({item.reviews || 0} reviews)</p>
                          <div className="flex items-center text-yellow-400 text-sm">
                            {"★".repeat(item.rating || 0)}
                            <span className="ml-1 text-gray-600">({item.rating || 0})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">
                            ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">{item.varientsName || "N/A"}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
                            }
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                          >
                            <FaTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-3xl shadow-lg"
              >
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty</p>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Explore Products
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          {data?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="p-6 bg-white rounded-3xl shadow-lg sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalQuantity})</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{ActualPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span>
                      {deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-sm text-green-600">
                    You save ₹{discount.toFixed(2)} on this order
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlaceOrder}
                  disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
                  className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                    selectedAddress === null || data?.length === 0 || !isPincodeValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  }`}
                >
                  Place Order
                </motion.button>
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Secure Payments | Easy Returns | 100% Authentic Products
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Cart;
