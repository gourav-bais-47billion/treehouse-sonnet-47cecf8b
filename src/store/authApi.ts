import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, AuthResponse, User } from '../types';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get current user session
    getSession: builder.query<ApiResponse<User>, void>({
      query: () => '/auth/me',
    }),

    // Login via AIM Portal SSO (initiates redirect)
    loginWithSSO: builder.mutation<ApiResponse<AuthResponse>, void>({
      query: () => ({
        url: '/auth/login-sso',
        method: 'POST',
      }),
    }),

    // Emergency login with local credentials
    emergencyLogin: builder.mutation<
      ApiResponse<AuthResponse>,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/emergency-login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Logout
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Verify token
    verifyToken: builder.query<ApiResponse<{ valid: boolean }>, void>({
      query: () => '/auth/verify',
    }),
  }),
});

export const {
  useGetSessionQuery,
  useLoginWithSSOmutation: useLoginWithSSOMutation,
  useEmergencyLoginMutation,
  useLogoutMutation,
  useVerifyTokenQuery,
} = authApi;
