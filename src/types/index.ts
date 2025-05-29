export interface BranchRequest {
  city: string;
  domain_name: string;
  logo?: string | null;
}

export interface GetBranchResponse {
  id: number;
  city: string;
  domain_name: string;
  logo_path: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CompanyRequest {
  name: string;
  contact_person_name: string;
  email: string;
  address: string;
  phone_number: string;
}

export interface GetCompanyResponse {
  id: number;
  name: string;
  contact_person_name: string;
  email: string;
  address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface BusRequest {
  company_id: number;
  bus_number: string;
  bus_type: 'AC' | 'NON_AC';
  total_seats: number;
}

export interface GetBusResponse {
  id: number;
  company_id: number;
  bus_number: string;
  bus_type: string;
  total_seats: number;
  created_at: string;
  is_active: boolean;
  company_data: GetCompanyResponse;
}

export interface TicketRequest {
  bus_id: number;
  seat_number: number;
  passenger_name: string;
  passenger_contact: string;
  passenger_email: string;
  status: string;
}

export interface GetTicketResponse {
  id: number;
  seat_number: number;
  passenger_name: string;
  passenger_contact: string;
  passenger_email: string;
  status: string;
  created_at: string;
  updated_at: string;
  bus_data: GetBusResponse;
  company_data: GetCompanyResponse;
}

export interface UserCreationRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  branch_id: number;
}

export interface ApiResponse<T> {
  status_message: string;
  data: T;
}