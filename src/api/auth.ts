import axios from 'axios';
import { ApiResponse, LoginRequest, LoginResponse } from '../types/auth';

const API_URL = 'http://localhost:8000';

export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>(`${API_URL}/auth/login`, data);
  return response.data;
};