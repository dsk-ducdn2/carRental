import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { 
  MenuIcon, 
  XIcon, 
  UserIcon, 
  LogOutIcon, 
  SettingsIcon, 
  BellIcon,
  SearchIcon,
  ShoppingCartIcon
} from 'lucide-qwik';

export const Header = component$(() => {
  const isMenuOpen = useSignal(false);
  const isUserMenuOpen = useSignal(false);
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'Nguyễn Văn A',
    email: 'user@example.com',
    avatar: null
  };
  
  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });
  
  const toggleUserMenu = $(() => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  });
  
  const closeMenus = $(() => {
    isMenuOpen.value = false;
    isUserMenuOpen.value = false;
  });
  
  return (
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <div class="flex items-center">
            <Link href="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CarRental</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav class="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Trang chủ
            </Link>
            <Link
              href="/cars"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Xe cho thuê
            </Link>
            <Link
              href="/about"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Liên hệ
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div class="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm xe..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            {/* Notifications */}
            <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <BellIcon class="w-5 h-5" />
              <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>
            
            {/* Cart */}
            <Link href="/cart" class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <ShoppingCartIcon class="w-5 h-5" />
              <span class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
            
            {/* User Menu */}
            <div class="relative">
              <button
                onClick$={toggleUserMenu}
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    class="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon class="w-4 h-4 text-gray-600" />
                  </div>
                )}
                <span class="text-sm font-medium">{user.name}</span>
              </button>
              
              {/* User Dropdown */}
              {isUserMenuOpen.value && (
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick$={closeMenus}
                  >
                    <UserIcon class="w-4 h-4 mr-3" />
                    Hồ sơ
                  </Link>
                  <Link
                    href="/settings"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick$={closeMenus}
                  >
                    <SettingsIcon class="w-4 h-4 mr-3" />
                    Cài đặt
                  </Link>
                  <hr class="my-1" />
                  <button
                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick$={() => {
                      closeMenus();
                      // Handle logout
                    }}
                  >
                    <LogOutIcon class="w-4 h-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div class="md:hidden">
            <button
              onClick$={toggleMenu}
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {isMenuOpen.value ? (
                <XIcon class="w-6 h-6" />
              ) : (
                <MenuIcon class="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen.value && (
          <div class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick$={closeMenus}
              >
                Trang chủ
              </Link>
              <Link
                href="/cars"
                class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick$={closeMenus}
              >
                Xe cho thuê
              </Link>
              <Link
                href="/about"
                class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick$={closeMenus}
              >
                Giới thiệu
              </Link>
              <Link
                href="/contact"
                class="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick$={closeMenus}
              >
                Liên hệ
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}); 