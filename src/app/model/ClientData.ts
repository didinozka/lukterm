export interface TechnicianData {
  name: string;
  phone: string;
  email: string;
}

export interface ClientData {
  id?: string;
  name: string;
  subtitle: string;
  technicianName: string;
  technicianPhone: string;
  technicianEmail: string;
  ipAddresses?: string[];
}

export interface ClientDataResponse {
  id: number;
  created_at?: string
}
