import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setRegisterLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRegisterError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRegisterSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    resetRegisterState: () => initialState,
  },
});

export const {
  setRegisterData,
  setRegisterLoading,
  setRegisterError,
  setRegisterSuccess,
  resetRegisterState,
} = registerSlice.actions;

export default registerSlice.reducer;
