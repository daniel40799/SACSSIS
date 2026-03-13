import React from 'react';

type BadgeColor = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
type BadgeVariant = 'flat' | 'border';

export interface BadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const flatColorClasses: Record<BadgeColor, string> = {
  gray: 'bg-gray-100 text-gray-600',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  purple: 'bg-purple-100 text-purple-700',
  pink: 'bg-pink-100 text-pink-700',
};

const borderColorClasses: Record<BadgeColor, string> = {
  gray: 'text-gray-600 ring-gray-500/10',
  red: 'text-red-700 ring-red-600/10',
  yellow: 'text-yellow-800 ring-yellow-600/20',
  green: 'text-green-700 ring-green-600/20',
  blue: 'text-blue-700 ring-blue-700/10',
  indigo: 'text-indigo-700 ring-indigo-700/10',
  purple: 'text-purple-700 ring-purple-700/10',
  pink: 'text-pink-700 ring-pink-700/10',
};

const dotColorClasses: Record<BadgeColor, string> = {
  gray: 'fill-gray-500',
  red: 'fill-red-500',
  yellow: 'fill-yellow-500',
  green: 'fill-green-500',
  blue: 'fill-blue-500',
  indigo: 'fill-indigo-500',
  purple: 'fill-purple-500',
  pink: 'fill-pink-500',
};

export function Badge({
  color = 'gray',
  variant = 'flat',
  dot = false,
  className = '',
  children,
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium';
  const colorClasses =
    variant === 'border'
      ? `ring-1 ring-inset ${borderColorClasses[color]}`
      : flatColorClasses[color];

  return (
    <span className={`${baseClasses} ${colorClasses} ${className}`}>
      {dot && (
        <svg
          viewBox="0 0 6 6"
          aria-hidden="true"
          className={`mr-1.5 h-1.5 w-1.5 ${dotColorClasses[color]}`}
        >
          <circle r={3} cx={3} cy={3} />
        </svg>
      )}
      {children}
    </span>
  );
}

export default Badge;
