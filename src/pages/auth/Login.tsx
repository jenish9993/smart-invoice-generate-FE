import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../../services/api";

interface LoginFormInputs {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit =async (data: LoginFormInputs) => {
        const res = await api("POST", "auth/login", {
            email: data.email,
            password: data.password,
            useAuth: false
        });

        if (res.success && res.data) {
            localStorage.setItem("token", res.data.token);
            // Optional: redirect or update app state
        } else {
            setErrorMessage(res.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to continue</p>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                                } px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-left text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

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
                                    className="absolute border-none right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineEye className="h-5 w-5" />
                                    )}
                                </button>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`block w-full pl-4 pr-20 rounded-lg border ${
                                        errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                    } py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-left text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                                    {...register("rememberMe")}
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border rounded text-sm font-medium font-bold text-white dark:text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <a href="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
