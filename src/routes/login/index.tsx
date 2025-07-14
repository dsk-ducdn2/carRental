import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Card, CardBody } from '~/components/ui/Card';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-qwik';

export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const showPassword = useSignal(false);
  const isLoading = useSignal(false);
  const errors = useSignal<{ email?: string; password?: string }>({});
  
  const handleSubmit = $(async () => {
    // Reset errors
    errors.value = {};
    
    // Validation
    if (!email.value) {
      errors.value.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.value.email = 'Email không hợp lệ';
    }
    
    if (!password.value) {
      errors.value.password = 'Mật khẩu là bắt buộc';
    } else if (password.value.length < 6) {
      errors.value.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (Object.keys(errors.value).length > 0) {
      return;
    }
    
    isLoading.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful login
      console.log('Login successful');
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      isLoading.value = false;
    }
  });
  
  const togglePassword = $(() => {
    showPassword.value = !showPassword.value;
  });
  
  return (
    <div class="min-h-screen bg-gray-50">
      <Header />
      
      <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <div class="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-white font-bold text-2xl">C</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">
              Đăng nhập
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Hoặc{' '}
              <Link href="/register" class="font-medium text-blue-600 hover:text-blue-500">
                đăng ký tài khoản mới
              </Link>
            </p>
          </div>
          
          <Card>
            <CardBody>
              <form onSubmit$={handleSubmit} class="space-y-6">
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Nhập email của bạn"
                    value={email.value}
                    onInput$={(_, el) => email.value = el.value}
                    error={errors.value.email}
                    leftIcon={<MailIcon class="w-4 h-4" />}
                    fullWidth
                  />
                </div>
                
                <div>
                  <Input
                    type={showPassword.value ? 'text' : 'password'}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={password.value}
                    onInput$={(_, el) => password.value = el.value}
                    error={errors.value.password}
                    leftIcon={<LockIcon class="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick$={togglePassword}
                        class="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.value ? (
                          <EyeOffIcon class="w-4 h-4" />
                        ) : (
                          <EyeIcon class="w-4 h-4" />
                        )}
                      </button>
                    }
                    fullWidth
                  />
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  
                  <div class="text-sm">
                    <Link href="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    loading={isLoading.value}
                    disabled={isLoading.value}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          
          {/* Social Login */}
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-50 text-gray-500">Hoặc đăng nhập với</span>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth>
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              
              <Button variant="outline" fullWidth>
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}); 