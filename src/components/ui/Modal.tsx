import { component$, Slot, QwikIntrinsicElements, useSignal, $ } from '@builder.io/qwik';

type ModalProps = QwikIntrinsicElements['div'] & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
};

export const Modal = component$<ModalProps>(({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  class: className = '',
  ...props
}) => {
  //const isAnimating = useSignal(false);
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };
  
  // Remove $() from handler definitions
  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      class="fixed inset-0 z-50 overflow-y-auto"
      onKeyDown$={$((event: KeyboardEvent) => handleKeyDown(event))}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick$={$(() => handleBackdropClick())}
      />
      
      {/* Modal */}
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3
                  id="modal-title"
                  class="text-lg font-semibold text-gray-900"
                >
                  {title}
                </h3>
              )}
              
              {showCloseButton && (
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick$={$(() => onClose())}
                  aria-label="Close modal"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div class="p-6">
            <Slot />
          </div>
        </div>
      </div>
    </div>
  );
}); 