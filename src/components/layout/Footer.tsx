import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon
} from 'lucide-qwik';

export const Footer = component$(() => {
  return (
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-xl font-bold">CarRental</span>
            </div>
            <p class="text-gray-300 mb-4 max-w-md">
              Dịch vụ cho thuê xe chất lượng cao với đội ngũ nhân viên chuyên nghiệp. 
              Chúng tôi cam kết mang đến trải nghiệm thuê xe tốt nhất cho khách hàng.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <FacebookIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <TwitterIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <InstagramIcon class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <YoutubeIcon class="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 class="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul class="space-y-2">
              <li>
                <Link href="/" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/cars" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Xe cho thuê
                </Link>
              </li>
              <li>
                <Link href="/about" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/terms" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" class="text-gray-300 hover:text-white transition-colors duration-200">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 class="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <PhoneIcon class="w-5 h-5 text-blue-400" />
                <span class="text-gray-300">+84 123 456 789</span>
              </div>
              <div class="flex items-center space-x-3">
                <MailIcon class="w-5 h-5 text-blue-400" />
                <span class="text-gray-300">info@carrental.vn</span>
              </div>
              <div class="flex items-start space-x-3">
                <MapPinIcon class="w-5 h-5 text-blue-400 mt-1" />
                <span class="text-gray-300">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div class="border-t border-gray-800 mt-8 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">
              © 2024 CarRental. Tất cả quyền được bảo lưu.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Điều khoản
              </Link>
              <Link href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Bảo mật
              </Link>
              <Link href="/cookies" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}); 