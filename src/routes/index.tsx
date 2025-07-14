import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { Button } from '~/components/ui/Button';
import { CarCard } from '~/components/cars/CarCard';
import { 
  ShieldIcon,
  ClockIcon,
  UsersIcon,
  CreditCardIcon
} from 'lucide-qwik';
import type { Car } from '~/types';
import { FuelType, TransmissionType, CarStatus } from '~/types';

// Mock data for featured cars
const featuredCars: Car[] = [
  {
    id: '1',
    name: 'Toyota Vios',
    brand: 'Toyota',
    model: 'Vios',
    year: 2022,
    licensePlate: '30A-12345',
    seats: 5,
    mileage: 15000,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.AUTOMATIC,
    status: CarStatus.AVAILABLE,
    pricePerHour: 150000,
    pricePerDay: 800000,
    pricePerMonth: 15000000,
    images: ['/cars/toyota-vios.jpg'],
    description: 'Xe sedan hạng B tiết kiệm nhiên liệu, phù hợp cho gia đình và công việc.',
    features: ['Điều hòa', 'Bluetooth', 'Camera lùi'],
    rating: 4.5,
    location: {
      latitude: 10.8231,
      longitude: 106.6297,
      address: 'Quận 1, TP.HCM'
    },
    ownerId: 'owner1',
    documents: [],
    maintenanceHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Honda City',
    brand: 'Honda',
    model: 'City',
    year: 2021,
    licensePlate: '30B-67890',
    seats: 5,
    mileage: 20000,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.AUTOMATIC,
    status: CarStatus.AVAILABLE,
    pricePerHour: 160000,
    pricePerDay: 850000,
    pricePerMonth: 16000000,
    images: ['/cars/honda-city.jpg'],
    description: 'Xe sedan cao cấp với thiết kế hiện đại và tiện nghi cao.',
    features: ['Điều hòa', 'Bluetooth', 'Camera lùi', 'Cảm biến đỗ xe'],
    rating: 4.8,
    location: {
      latitude: 10.8231,
      longitude: 106.6297,
      address: 'Quận 3, TP.HCM'
    },
    ownerId: 'owner2',
    documents: [],
    maintenanceHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Ford Ranger',
    brand: 'Ford',
    model: 'Ranger',
    year: 2023,
    licensePlate: '30C-11111',
    seats: 5,
    mileage: 8000,
    fuelType: FuelType.DIESEL,
    transmission: TransmissionType.MANUAL,
    status: CarStatus.AVAILABLE,
    pricePerHour: 200000,
    pricePerDay: 1200000,
    pricePerMonth: 22000000,
    images: ['/cars/ford-ranger.jpg'],
    description: 'Xe bán tải mạnh mẽ, phù hợp cho công việc và du lịch.',
    features: ['Điều hòa', 'Bluetooth', 'Camera lùi', 'Cảm biến đỗ xe', 'Gầm cao'],
    rating: 4.6,
    location: {
      latitude: 10.8231,
      longitude: 106.6297,
      address: 'Quận 7, TP.HCM'
    },
    ownerId: 'owner3',
    documents: [],
    maintenanceHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Thuê xe dễ dàng
                <span class="block text-blue-200">An toàn - Tiện lợi</span>
              </h1>
              <p class="text-xl mb-8 text-blue-100">
                Khám phá dịch vụ cho thuê xe chất lượng cao với đội ngũ chuyên nghiệp. 
                Đặt xe nhanh chóng, thanh toán an toàn, trải nghiệm tuyệt vời.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <Link href="/cars">
                  <Button size="lg" class="w-full sm:w-auto">
                    Tìm xe ngay
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" class="w-full sm:w-auto">
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>
            </div>
            <div class="hidden lg:block">
              <img
                src="/hero-car.jpg"
                alt="Car Rental"
                class="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Promotion Section */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Chương Trình Khuyến Mãi</h2>
            <p class="text-lg text-gray-600">Nhận nhiều ưu đãi hấp dẫn từ Mioto</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="rounded-2xl overflow-hidden shadow-md bg-white">
              <img src="/promos/promo-1.jpg" alt="Đặt sớm - Lễ thêm an nhàn" class="w-full h-56 object-cover" />
            </div>
            <div class="rounded-2xl overflow-hidden shadow-md bg-white">
              <img src="/promos/promo-2.jpg" alt="Giải nhiệt mùa hè" class="w-full h-56 object-cover" />
            </div>
            <div class="rounded-2xl overflow-hidden shadow-md bg-white">
              <img src="/promos/promo-3.jpg" alt="Có Mioto - Tự do khám phá" class="w-full h-56 object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn CarRental?
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm thuê xe tốt nhất với những ưu điểm vượt trội
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldIcon class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">An toàn tuyệt đối</h3>
              <p class="text-gray-600">
                Tất cả xe đều được kiểm tra định kỳ và bảo hiểm đầy đủ
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Giao xe nhanh</h3>
              <p class="text-gray-600">
                Giao xe trong vòng 30 phút tại địa điểm bạn yêu cầu
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Thanh toán linh hoạt</h3>
              <p class="text-gray-600">
                Hỗ trợ nhiều phương thức thanh toán an toàn và tiện lợi
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon class="w-8 h-8 text-orange-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
              <p class="text-gray-600">
                Đội ngũ hỗ trợ khách hàng chuyên nghiệp, sẵn sàng 24/7
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Xe nổi bật
            </h2>
            <p class="text-lg text-gray-600">
              Khám phá những chiếc xe được yêu thích nhất
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div class="text-center mt-12">
            <Link href="/cars">
              <Button size="lg">
                Xem tất cả xe
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Quy trình thuê xe
            </h2>
            <p class="text-lg text-gray-600">
              Chỉ 4 bước đơn giản để có xe thuê
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                1
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Chọn xe</h3>
              <p class="text-gray-600">
                Tìm kiếm và chọn xe phù hợp với nhu cầu của bạn
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                2
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Đặt xe</h3>
              <p class="text-gray-600">
                Chọn thời gian và địa điểm nhận xe
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                3
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Thanh toán</h3>
              <p class="text-gray-600">
                Thanh toán an toàn qua nhiều phương thức
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                4
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Nhận xe</h3>
              <p class="text-gray-600">
                Nhận xe và bắt đầu hành trình của bạn
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-16 bg-blue-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p class="text-xl mb-8 text-blue-100">
            Đăng ký ngay để nhận ưu đãi đặc biệt cho khách hàng mới
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Đăng ký miễn phí
              </Button>
            </Link>
            <Link href="/cars">
              <Button size="lg" variant="outline">
                Khám phá xe
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
});
