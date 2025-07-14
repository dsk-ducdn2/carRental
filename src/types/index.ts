export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  isBlacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  OWNER = 'owner',
  CUSTOMER = 'customer'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  seats: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  status: CarStatus;
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  images: string[];
  description: string;
  features: string[];
  rating?: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  ownerId: string;
  documents: CarDocument[];
  maintenanceHistory: MaintenanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export enum FuelType {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid'
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic'
}

export enum CarStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  RESERVED = 'reserved',
  MAINTENANCE = 'maintenance',
  UNAVAILABLE = 'unavailable'
}

export interface CarDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  expiryDate: Date;
  isExpired: boolean;
}

export enum DocumentType {
  INSURANCE = 'insurance',
  REGISTRATION = 'registration',
  INSPECTION = 'inspection',
  OTHER = 'other'
}

export interface Rental {
  id: string;
  carId: string;
  customerId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: RentalStatus;
  paymentStatus: PaymentStatus;
  deposit: number;
  notes?: string;
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RentalStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export interface MaintenanceRecord {
  id: string;
  carId: string;
  type: MaintenanceType;
  description: string;
  cost: number;
  date: Date;
  mileage: number;
  nextMaintenanceDate?: Date;
  nextMaintenanceMileage?: number;
  performedBy: string;
}

export enum MaintenanceType {
  ROUTINE = 'routine',
  REPAIR = 'repair',
  INSPECTION = 'inspection',
  OTHER = 'other'
}

export interface DashboardStats {
  totalRevenue: number;
  totalRentals: number;
  activeRentals: number;
  totalCars: number;
  availableCars: number;
  maintenanceCars: number;
  topPerformingCars: Car[];
  recentRentals: Rental[];
  upcomingMaintenance: MaintenanceRecord[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 