import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin } from '../services/api'; 
import axios from 'axios';

// API desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL; 

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await apiLogin(credentials);
  return response; 
});

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/register`, credentials);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; 
        state.token = action.payload.token || null; 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; 
        state.token = action.payload.token || null; 
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
