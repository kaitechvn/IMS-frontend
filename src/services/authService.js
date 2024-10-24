import axiosInstance from "@/plugins/axios";

const API_AUTH = '/auth';  

export const login = (username, password) => {
  return axiosInstance.post(`${API_AUTH}/login`, { username, password });
};


export const forgotPassword = (email) => {
  return axiosInstance.post(`${API_AUTH}/forgot-password`, { email });
};

export const resetPassword = (token, newPassword) => {
  return axiosInstance.post(`${API_AUTH}/reset-password`, { token, newPassword})
};

