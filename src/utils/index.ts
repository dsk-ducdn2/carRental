import { format, formatDistance, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { CarStatus, RentalStatus, PaymentStatus, UserRole } from '~/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy', { locale: vi });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: vi });
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale: vi 
  });
};

export const getCarStatusColor = (status: CarStatus): string => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'rented':
      return 'bg-blue-100 text-blue-800';
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800';
    case 'maintenance':
      return 'bg-orange-100 text-orange-800';
    case 'unavailable':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getRentalStatusColor = (status: RentalStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPaymentStatusColor = (status: PaymentStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'refunded':
      return 'bg-blue-100 text-blue-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'Quản trị viên';
    case 'staff':
      return 'Nhân viên';
    case 'owner':
      return 'Chủ xe';
    case 'customer':
      return 'Khách hàng';
    default:
      return 'Không xác định';
  }
};

export const calculateRentalDuration = (startDate: Date, endDate: Date): {
  hours: number;
  days: number;
  totalHours: number;
} => {
  const diffInMs = endDate.getTime() - startDate.getTime();
  const totalHours = Math.ceil(diffInMs / (1000 * 60 * 60));
  const days = Math.ceil(totalHours / 24);
  const hours = totalHours % 24;

  return { hours, days, totalHours };
};

export const calculateRentalPrice = (
  startDate: Date,
  endDate: Date,
  pricePerHour: number,
  pricePerDay: number,
  pricePerMonth: number
): number => {
  const { totalHours } = calculateRentalDuration(startDate, endDate);
  
  if (totalHours <= 24) {
    return totalHours * pricePerHour;
  } else if (totalHours <= 24 * 30) {
    const days = Math.ceil(totalHours / 24);
    return days * pricePerDay;
  } else {
    const months = Math.ceil(totalHours / (24 * 30));
    return months * pricePerMonth;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 