import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../../services/api";

interface SignupFormInputs {
    businessName: string;
    gstNumber?: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormInputs>();

    const onSubmit = async (data: SignupFormInputs) => {
        const res = await api("POST", "auth/signup", {
            businessName: data.businessName,
            gstNumber: data.gstNumber?.toUpperCase(),
            email: data.email,
            password: data.password,
            useAuth: false
        });

        if (res.success && res.data) {
            localStorage.setItem("token", res.data.token);
            // Redirect or show success
        } else {
            setErrorMessage(res.error || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 flex items-center justify-center">
            <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign up to get started</p>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Business Name */}
                        <div>
                            <label
                                htmlFor="businessName"
                                className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Business Name
                            </label>
                            <input
                                id="businessName"
                                type="text"
                                className={`block w-full rounded-lg border ${
                                    errors.businessName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                } px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                {...register("businessName", { required: "Business name is required" })}
                            />
                            {errors.businessName && (
                                <p className="text-sm text-left text-red-500">{errors.businessName.message}</p>
                            )}
                        </div>

                        {/* GSTIN */}
                        <div>
                            <label
                                htmlFor="gstin"
                                className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                GSTIN <span className="text-xs text-gray-400">(optional)</span>
                            </label>
                            <input
                                id="gstNumber"
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("gstNumber")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={`block w-full rounded-lg border ${
                                    errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                } px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <p className="text-sm text-left text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`block w-full pl-4 pr-10 rounded-lg border ${
                                        errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                    } py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum 8 characters" },
                                    })}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-left text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                                <input
                                    id="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    className={`block w-full pl-4 pr-10 rounded-lg border ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-600"
                                    } py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) => value === watch("password") || "Passwords do not match",
                                    })}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-left text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
