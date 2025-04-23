import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { makeRequest } from "@/api";
import swal from "sweetalert";

export default function VerifyEmail() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const router = useRouter();
    const { userId, email } = router.query;

    const inputRefs = Array(4).fill(null).map(() => useRef(null));

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsTimeUp(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const otpCode = otp.join("");

        if (otpCode.length < 4) {
            swal("Error", "Please enter a 4-digit OTP.", "error");
            setIsLoading(false);
            return;
        }

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const response = await makeRequest("POST", "/Authentication/VerifyEmail", {
                Email:urlParams.get('email'),
                Otp: otpCode,
            });

            if (response.code === 200) {
                swal("Success", "Email verified successfully!", "success").then(() => {
                    router.push("/login");
                });
            } else {
                swal("Error", response.message || "Invalid OTP. Please try again.", "error");
                setOtp(["", "", "", ""]);
                inputRefs[0].current.focus();
            }
        } catch (error) {
            swal("Error", "Network error occurred. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoading(true);
        try {
    
            const urlParams = new URLSearchParams(window.location.search);
            const response = await makeRequest("POST", "/Authentication/SendOtpEmail", { Email:urlParams.get('email')});
            if (response.code === 200) {
                swal("Success", "New OTP sent to your email!", "success");
                setOtp(["", "", "", ""]);
                setTimeLeft(120); // Reset timer
                setIsTimeUp(false);
                inputRefs[0].current.focus();
            } else {
                swal("Error", response.message || "Failed to resend OTP.", "error");
            }
        } catch (error) {
            swal("Error", "Network error occurred. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const resendOtp = async () => {
       
    };

    const handleInputChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs[index - 1].current.focus();
            }
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const handleReset = () => {
        setOtp(["", "", "", ""]);
        inputRefs[0].current.focus();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Verify Email</h2>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <p className="text-center text-gray-600">We have sent an OTP to your email: {email}</p>
                    <p className="text-center text-gray-600">Time Left: {formatTime(timeLeft)}</p>
                    <div className="flex justify-center space-x-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                required
                                disabled={isTimeUp}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between gap-4 mt-4">
                        {!isTimeUp ? (
                            <button
                                className="bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                                disabled={isLoading}
                            >
                                {isLoading ? "Resending..." : "Resend OTP"}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition"
                            disabled={isLoading || isTimeUp}
                        >
                            Reset
                        </button>


                    </div>
                </form>
            </div>
        </div>
    );
}
