export interface TechnicianData {
  name: string;
  phone: string;
  email: string;
}

export interface ClientData {
  name: string;
  subtitle: string;
  technician: TechnicianData;
}
