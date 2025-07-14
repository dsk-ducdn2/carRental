import { component$, QwikIntrinsicElements } from '@builder.io/qwik';

type InputProps = QwikIntrinsicElements['input'] & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: any;
  rightIcon?: any;
  fullWidth?: boolean;
};

export const Input = component$<InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  class: className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200';
  const errorClasses = error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300';
  const iconClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = [
    baseClasses,
    errorClasses,
    iconClasses,
    widthClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div class={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          for={inputId}
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div class="relative">
        {leftIcon && (
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          id={inputId}
          class={classes}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span class="text-gray-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p
          id={`${inputId}-error`}
          class="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          class="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}); 