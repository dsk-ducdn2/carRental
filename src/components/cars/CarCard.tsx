import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import { 
  CarIcon,
  UsersIcon,
  FuelIcon,
  MapPinIcon,
  StarIcon
} from 'lucide-qwik';
import type { Car } from '~/types';
import { formatCurrency, getCarStatusColor} from '~/utils';

interface CarCardProps {
  car: Car;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}

export const CarCard = component$<CarCardProps>(({
  car,
  showActions = true,
  variant = 'default'
}) => {
  const mainImage = car.images[0] || '/placeholder-car.jpg';
  
  if (variant === 'compact') {
    return (
      <Card class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex">
          <div class="w-24 h-24 flex-shrink-0">
            <img
              src={mainImage}
              alt={car.name}
              class="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div class="flex-1 p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 truncate">
                  {car.brand} {car.model}
                </h3>
                <p class="text-sm text-gray-500">{car.year}</p>
                <div class="flex items-center mt-2">
                  <span class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCarStatusColor(car.status)}`}>
                    {car.status === 'available' ? 'Có sẵn' : 
                     car.status === 'rented' ? 'Đã thuê' :
                     car.status === 'maintenance' ? 'Bảo trì' : 'Không khả dụng'}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-blue-600">
                  {formatCurrency(car.pricePerDay)}
                </p>
                <p class="text-xs text-gray-500">/ngày</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card class="hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div class="relative">
        <img
          src={mainImage}
          alt={car.name}
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="absolute top-2 right-2">
          <span class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCarStatusColor(car.status)}`}>
            {car.status === 'available' ? 'Có sẵn' : 
             car.status === 'rented' ? 'Đã thuê' :
             car.status === 'maintenance' ? 'Bảo trì' : 'Không khả dụng'}
          </span>
        </div>
        {car.rating && (
          <div class="absolute bottom-2 left-2 flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded-md">
            <StarIcon class="w-4 h-4 mr-1" />
            <span class="text-sm">{car.rating}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <CardHeader>
        <CardTitle class="text-lg">
          {car.brand} {car.model}
        </CardTitle>
        <p class="text-sm text-gray-500">{car.year} • {car.licensePlate}</p>
      </CardHeader>
      
      <CardBody>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="flex items-center space-x-2">
            <UsersIcon class="w-4 h-4 text-gray-400" />
            <span>{car.seats} chỗ ngồi</span>
          </div>
          <div class="flex items-center space-x-2">
            <FuelIcon class="w-4 h-4 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div class="flex items-center space-x-2">
            <CarIcon class="w-4 h-4 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
          <div class="flex items-center space-x-2">
            <MapPinIcon class="w-4 h-4 text-gray-400" />
            <span class="truncate">{car.location.address}</span>
          </div>
        </div>
        
        {car.description && (
          <p class="text-sm text-gray-600 mt-3 line-clamp-2">
            {car.description}
          </p>
        )}
        
        {/* Features */}
        {car.features.length > 0 && (
          <div class="mt-3">
            <div class="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600">
                  +{car.features.length - 3} khác
                </span>
              )}
            </div>
          </div>
        )}
      </CardBody>
      
      <CardFooter>
        <div class="w-full">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="text-lg font-bold text-blue-600">
                {formatCurrency(car.pricePerDay)}
              </p>
              <p class="text-xs text-gray-500">/ngày</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">
                {formatCurrency(car.pricePerHour)}/giờ
              </p>
              <p class="text-xs text-gray-500">
                {formatCurrency(car.pricePerMonth)}/tháng
              </p>
            </div>
          </div>
          
          {showActions && (
            <div class="flex space-x-2">
              <Link href={`/cars/${car.id}`} class="flex-1">
                <Button variant="outline" fullWidth>
                  Xem chi tiết
                </Button>
              </Link>
              {car.status === 'available' && (
                <Link href={`/cars/${car.id}/rent`} class="flex-1">
                  <Button fullWidth>
                    Thuê ngay
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}); 