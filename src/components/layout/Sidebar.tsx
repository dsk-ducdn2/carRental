import { component$, $ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { 
  HomeIcon,
  CarIcon,
  UsersIcon,
  CalendarIcon,
  SettingsIcon,
  BarChart3Icon,
  WrenchIcon,
  CreditCardIcon,
  FileTextIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-qwik';
import type { UserRole } from '~/types';
import { getRoleDisplayName } from '~/utils';

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
  };
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = component$<SidebarProps>(({
  user,
  isCollapsed = false,
  onToggle
}) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      roles: ['admin', 'owner', 'staff']
    },
    {
      title: 'Quản lý xe',
      href: '/dashboard/cars',
      icon: CarIcon,
      roles: ['admin', 'owner', 'staff']
    },
    {
      title: 'Quản lý người dùng',
      href: '/dashboard/users',
      icon: UsersIcon,
      roles: ['admin']
    },
    {
      title: 'Đặt xe',
      href: '/dashboard/rentals',
      icon: CalendarIcon,
      roles: ['admin', 'owner', 'staff', 'customer']
    },
    {
      title: 'Thanh toán',
      href: '/dashboard/payments',
      icon: CreditCardIcon,
      roles: ['admin', 'owner', 'staff']
    },
    {
      title: 'Bảo trì',
      href: '/dashboard/maintenance',
      icon: WrenchIcon,
      roles: ['admin', 'owner', 'staff']
    },
    {
      title: 'Báo cáo',
      href: '/dashboard/reports',
      icon: BarChart3Icon,
      roles: ['admin', 'owner']
    },
    {
      title: 'Tài liệu',
      href: '/dashboard/documents',
      icon: FileTextIcon,
      roles: ['admin', 'owner', 'staff']
    },
    {
      title: 'Cài đặt',
      href: '/dashboard/settings',
      icon: SettingsIcon,
      roles: ['admin', 'owner', 'staff', 'customer']
    }
  ];
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );
  
  const isActive = (href: string) => {
    return location.url.pathname === href || location.url.pathname.startsWith(href + '/');
  };
  
  return (
    <div class={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <span class="text-lg font-semibold text-gray-900">CarRental</span>
          </div>
        )}
        
        <button
          onClick$={onToggle ? $(() => onToggle()) : undefined}
          class="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRightIcon class="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeftIcon class="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* User Info */}
      {!isCollapsed && (
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                class="w-10 h-10 rounded-full"
              />
            ) : (
              <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-gray-600 font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav class="flex-1 overflow-y-auto">
        <ul class="py-4">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  class={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon class={`w-5 h-5 ${
                    isCollapsed ? 'mx-auto' : 'mr-3'
                  }`} />
                  {!isCollapsed && (
                    <span>{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div class="p-4 border-t border-gray-200">
        <button
          class={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          onClick$={() => {
            // Handle logout
          }}
        >
          <LogOutIcon class={`w-5 h-5 ${
            isCollapsed ? 'mx-auto' : 'mr-3'
          }`} />
          {!isCollapsed && (
            <span>Đăng xuất</span>
          )}
        </button>
      </div>
    </div>
  );
}); 