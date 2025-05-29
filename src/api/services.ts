import apiClient from './client';
import {
  ApiResponse,
  BranchRequest,
  GetBranchResponse,
  CompanyRequest,
  GetCompanyResponse,
  BusRequest,
  GetBusResponse,
  TicketRequest,
  GetTicketResponse,
  UserCreationRequest,
} from '../types';

// Branches
export const getBranches = () => 
  apiClient.get<ApiResponse<GetBranchResponse[]>>('/admin/branches');

export const createBranch = (data: BranchRequest) =>
  apiClient.post<ApiResponse<{ message: string }>>('/admin/branches', data);

// Companies
export const getCompanies = () =>
  apiClient.get<ApiResponse<GetCompanyResponse[]>>('/companies');

export const createCompany = (data: CompanyRequest) =>
  apiClient.post<ApiResponse<{ message: string }>>('/companies', data);

// Buses
export const getBuses = () =>
  apiClient.get<ApiResponse<GetBusResponse[]>>('/buses');

export const createBus = (data: BusRequest) =>
  apiClient.post<ApiResponse<{ message: string }>>('/buses', data);

// Tickets
export const getTickets = () =>
  apiClient.get<ApiResponse<GetTicketResponse[]>>('/tickets');

export const createTicket = (data: TicketRequest) =>
  apiClient.post<ApiResponse<{ message: string }>>('/tickets', data);

// Users
export const createUser = (data: UserCreationRequest) =>
  apiClient.post<ApiResponse<{ message: string }>>('/admin/users', data);