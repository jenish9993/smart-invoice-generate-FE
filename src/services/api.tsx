import axiosInstance from "../lib/axios.tsx";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const api = async <T = any,>(
    method: HTTPMethod,
    endpoint: string,
    data?: any,
    useAuth: boolean = true // Default to true for authenticated endpoints
): Promise<{
    success: boolean;
    data?: T;
    error?: string;
}> => {
    try {
        const headers: Record<string, string> = {};
        if (useAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const response = await axiosInstance.request<T>({
            method,
            url: `${endpoint}`,
            data: method === "GET" ? undefined : data,
            params: method === "GET" ? data : undefined,
            headers,
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Something went wrong.";
        return { success: false, error: message };
    }
};
