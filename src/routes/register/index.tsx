import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Card, CardHeader, CardTitle, CardBody } from '~/components/ui/Card';
import { 
  EyeIcon, 
  EyeOffIcon, 
  MailIcon, 
  LockIcon, 
  UserIcon, 
  PhoneIcon,
  UploadIcon,
  FileIcon,
  CheckIcon
} from 'lucide-qwik';
import type { UserRole } from '~/types';

export default component$(() => {
  const formData = useSignal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as UserRole
  });
  
  const showPassword = useSignal(false);
  const showConfirmPassword = useSignal(false);
  const isLoading = useSignal(false);
  const currentStep = useSignal(1);
  const errors = useSignal<Record<string, string>>({});
  
  const uploadedDocuments = useSignal<{
    idCard?: File;
    driverLicense?: File;
    businessLicense?: File;
  }>({});
  
  const handleInputChange = $((field: string, value: string) => {
    formData.value = { ...formData.value, [field]: value };
    // Clear error when user starts typing
    if (errors.value[field]) {
      errors.value = { ...errors.value, [field]: '' };
    }
  });
  
  const validateStep1 = $(() => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.value.firstName) {
      newErrors.firstName = 'Họ là bắt buộc';
    }
    
    if (!formData.value.lastName) {
      newErrors.lastName = 'Tên là bắt buộc';
    }
    
    if (!formData.value.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.value.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.value.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  });
  
  const validateStep2 = $(() => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.value.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.value.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.value.password)) {
      newErrors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
    }
    
    if (!formData.value.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.value.password !== formData.value.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  });
  
  const validateStep3 = $(() => {
    const newErrors: Record<string, string> = {};
    
    if (!uploadedDocuments.value.idCard) {
      newErrors.idCard = 'CCCD/CMND là bắt buộc';
    }
    
    if (!uploadedDocuments.value.driverLicense) {
      newErrors.driverLicense = 'Giấy phép lái xe là bắt buộc';
    }
    
    if (formData.value.role === 'owner' && !uploadedDocuments.value.businessLicense) {
      newErrors.businessLicense = 'Giấy phép kinh doanh là bắt buộc cho chủ xe';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  });
  
  const nextStep = $(() => {
    let isValid = false;
    
    if (currentStep.value === 1) {
      //isValid = validateStep1();
    } else if (currentStep.value === 2) {
      //isValid = validateStep2();
    }
    
    if (isValid) {
      currentStep.value++;
    }
  });
  
  const prevStep = $(() => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  });
  
  const handleFileUpload = $((field: string, event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      uploadedDocuments.value = {
        ...uploadedDocuments.value,
        [field]: target.files[0]
      };
      // Clear error
      if (errors.value[field]) {
        errors.value = { ...errors.value, [field]: '' };
      }
    }
  });
  
  const handleSubmit = $(async () => {
    if (!validateStep3()) {
      return;
    }
    
    isLoading.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful registration
      console.log('Registration successful');
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      isLoading.value = false;
    }
  });
  
  return (
    <div class="min-h-screen bg-gray-50">
      <Header />
      
      <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl w-full space-y-8">
          <div class="text-center">
            <div class="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-white font-bold text-2xl">C</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900">
              Đăng ký tài khoản
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Hoặc{' '}
              <Link href="/login" class="font-medium text-blue-600 hover:text-blue-500">
                đăng nhập nếu đã có tài khoản
              </Link>
            </p>
          </div>
          
          {/* Progress Steps */}
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} class="flex items-center">
                  <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep.value >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep.value > step ? (
                      <CheckIcon class="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div class={`w-16 h-1 ${
                      currentStep.value > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardBody>
              {/* Step 1: Personal Information */}
              {currentStep.value === 1 && (
                <div class="space-y-6">
                  <div class="text-center mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">Thông tin cá nhân</h3>
                    <p class="text-gray-600">Nhập thông tin cơ bản của bạn</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      label="Họ"
                      placeholder="Nhập họ"
                      value={formData.value.firstName}
                      onInput$={(_, el) => handleInputChange('firstName', el.value)}
                      error={errors.value.firstName}
                      leftIcon={<UserIcon class="w-4 h-4" />}
                      fullWidth
                    />
                    
                    <Input
                      type="text"
                      label="Tên"
                      placeholder="Nhập tên"
                      value={formData.value.lastName}
                      onInput$={(_, el) => handleInputChange('lastName', el.value)}
                      error={errors.value.lastName}
                      leftIcon={<UserIcon class="w-4 h-4" />}
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Nhập email"
                    value={formData.value.email}
                    onInput$={(_, el) => handleInputChange('email', el.value)}
                    error={errors.value.email}
                    leftIcon={<MailIcon class="w-4 h-4" />}
                    fullWidth
                  />
                  
                  <Input
                    type="tel"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={formData.value.phone}
                    onInput$={(_, el) => handleInputChange('phone', el.value)}
                    error={errors.value.phone}
                    leftIcon={<PhoneIcon class="w-4 h-4" />}
                    fullWidth
                  />
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Loại tài khoản
                    </label>
                    <select
                      value={formData.value.role}
                      onChange$={(_, el) => handleInputChange('role', el.value)}
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="customer">Khách hàng</option>
                      <option value="owner">Chủ xe</option>
                    </select>
                  </div>
                  
                  <div class="flex justify-end">
                    <Button onClick$={nextStep}>
                      Tiếp theo
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Password */}
              {currentStep.value === 2 && (
                <div class="space-y-6">
                  <div class="text-center mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">Tạo mật khẩu</h3>
                    <p class="text-gray-600">Tạo mật khẩu an toàn cho tài khoản</p>
                  </div>
                  
                  <Input
                    type={showPassword.value ? 'text' : 'password'}
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={formData.value.password}
                    onInput$={(_, el) => handleInputChange('password', el.value)}
                    error={errors.value.password}
                    leftIcon={<LockIcon class="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick$={() => showPassword.value = !showPassword.value}
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
                  
                  <Input
                    type={showConfirmPassword.value ? 'text' : 'password'}
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.value.confirmPassword}
                    onInput$={(_, el) => handleInputChange('confirmPassword', el.value)}
                    error={errors.value.confirmPassword}
                    leftIcon={<LockIcon class="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick$={() => showConfirmPassword.value = !showConfirmPassword.value}
                        class="text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword.value ? (
                          <EyeOffIcon class="w-4 h-4" />
                        ) : (
                          <EyeIcon class="w-4 h-4" />
                        )}
                      </button>
                    }
                    fullWidth
                  />
                  
                  <div class="flex justify-between">
                    <Button variant="outline" onClick$={prevStep}>
                      Quay lại
                    </Button>
                    <Button onClick$={nextStep}>
                      Tiếp theo
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Document Upload */}
              {currentStep.value === 3 && (
                <div class="space-y-6">
                  <div class="text-center mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">Xác minh danh tính</h3>
                    <p class="text-gray-600">Upload các giấy tờ cần thiết</p>
                  </div>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        CCCD/CMND *
                      </label>
                      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange$={(event) => handleFileUpload('idCard', event)}
                          class="hidden"
                          id="idCard"
                        />
                        <label for="idCard" class="cursor-pointer">
                          {uploadedDocuments.value.idCard ? (
                            <div class="flex items-center justify-center space-x-2 text-green-600">
                              <FileIcon class="w-5 h-5" />
                              <span>{uploadedDocuments.value.idCard.name}</span>
                            </div>
                          ) : (
                            <div class="flex flex-col items-center space-y-2">
                              <UploadIcon class="w-8 h-8 text-gray-400" />
                              <span class="text-sm text-gray-600">Click để upload CCCD/CMND</span>
                            </div>
                          )}
                        </label>
                      </div>
                      {errors.value.idCard && (
                        <p class="mt-1 text-sm text-red-600">{errors.value.idCard}</p>
                      )}
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Giấy phép lái xe *
                      </label>
                      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange$={(event) => handleFileUpload('driverLicense', event)}
                          class="hidden"
                          id="driverLicense"
                        />
                        <label for="driverLicense" class="cursor-pointer">
                          {uploadedDocuments.value.driverLicense ? (
                            <div class="flex items-center justify-center space-x-2 text-green-600">
                              <FileIcon class="w-5 h-5" />
                              <span>{uploadedDocuments.value.driverLicense.name}</span>
                            </div>
                          ) : (
                            <div class="flex flex-col items-center space-y-2">
                              <UploadIcon class="w-8 h-8 text-gray-400" />
                              <span class="text-sm text-gray-600">Click để upload giấy phép lái xe</span>
                            </div>
                          )}
                        </label>
                      </div>
                      {errors.value.driverLicense && (
                        <p class="mt-1 text-sm text-red-600">{errors.value.driverLicense}</p>
                      )}
                    </div>
                    
                    {formData.value.role === 'owner' && (
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          Giấy phép kinh doanh *
                        </label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange$={(event) => handleFileUpload('businessLicense', event)}
                            class="hidden"
                            id="businessLicense"
                          />
                          <label for="businessLicense" class="cursor-pointer">
                            {uploadedDocuments.value.businessLicense ? (
                              <div class="flex items-center justify-center space-x-2 text-green-600">
                                <FileIcon class="w-5 h-5" />
                                <span>{uploadedDocuments.value.businessLicense.name}</span>
                              </div>
                            ) : (
                              <div class="flex flex-col items-center space-y-2">
                                <UploadIcon class="w-8 h-8 text-gray-400" />
                                <span class="text-sm text-gray-600">Click để upload giấy phép kinh doanh</span>
                              </div>
                            )}
                          </label>
                        </div>
                        {errors.value.businessLicense && (
                          <p class="mt-1 text-sm text-red-600">{errors.value.businessLicense}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div class="flex justify-between">
                    <Button variant="outline" onClick$={prevStep}>
                      Quay lại
                    </Button>
                    <Button onClick$={handleSubmit} loading={isLoading.value}>
                      Hoàn tất đăng ký
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}); 