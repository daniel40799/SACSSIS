import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  align?: 'left' | 'right';
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Dropdown({
  label,
  items,
  align = 'right',
  variant = 'default',
  className = '',
}: DropdownProps) {
  const alignClasses = align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right';

  const buttonClasses =
    variant === 'minimal'
      ? 'inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600'
      : 'inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';

  // Group items by dividers
  const groups: DropdownItem[][] = [];
  let current: DropdownItem[] = [];
  for (const item of items) {
    if (item.dividerBefore && current.length > 0) {
      groups.push(current);
      current = [];
    }
    current.push(item);
  }
  if (current.length > 0) groups.push(current);

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <MenuButton className={buttonClasses}>
        {label}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className={`absolute ${alignClasses} z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'border-t border-gray-100 py-1' : 'py-1'}>
            {group.map((item) => (
              <MenuItem key={item.label} disabled={item.disabled}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={`block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${
                      item.danger ? 'text-red-700' : 'text-gray-700'
                    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`block w-full px-4 py-2 text-left text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${
                      item.danger ? 'text-red-700' : 'text-gray-700'
                    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
