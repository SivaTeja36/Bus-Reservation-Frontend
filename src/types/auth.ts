export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  role: string;
  contact: string;
  jwt_token: string;
}

export interface ApiResponse<T> {
  status_message: string;
  data: T;
}