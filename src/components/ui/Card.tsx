import { component$, Slot, QwikIntrinsicElements } from '@builder.io/qwik';

type CardProps = QwikIntrinsicElements['div'] & {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

export const Card = component$<CardProps>(({
  variant = 'default',
  padding = 'md',
  class: className = '',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg border transition-shadow duration-200';
  
  const variantClasses = {
    default: 'border-gray-200 shadow-sm',
    elevated: 'border-gray-200 shadow-lg',
    outlined: 'border-gray-300 shadow-none'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div class={classes} {...props}>
      <Slot />
    </div>
  );
});

export const CardHeader = component$<QwikIntrinsicElements['div']>(({
  class: className = '',
  ...props
}) => {
  return (
    <div class={`pb-4 ${className}`} {...props}>
      <Slot />
    </div>
  );
});

export const CardTitle = component$<QwikIntrinsicElements['h3']>(({
  class: className = '',
  ...props
}) => {
  return (
    <h3 class={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      <Slot />
    </h3>
  );
});

export const CardSubtitle = component$<QwikIntrinsicElements['p']>(({
  class: className = '',
  ...props
}) => {
  return (
    <p class={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
      <Slot />
    </p>
  );
});

export const CardBody = component$<QwikIntrinsicElements['div']>(({
  class: className = '',
  ...props
}) => {
  return (
    <div class={className} {...props}>
      <Slot />
    </div>
  );
});

export const CardFooter = component$<QwikIntrinsicElements['div']>(({
  class: className = '',
  ...props
}) => {
  return (
    <div class={`pt-4 border-t border-gray-200 ${className}`} {...props}>
      <Slot />
    </div>
  );
}); 