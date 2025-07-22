import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Type helpers for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
