import api from "./axios";

export const registerApi = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getProfileApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfileApi = async (data: { name?: string; phone?: string; address?: string }) => {
  const response = await api.patch("/auth/me", data);
  return response.data;
};
