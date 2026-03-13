'use client';

import { useState, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; iconColor: string }
> = {
  success: { icon: CheckCircleIcon, iconColor: 'text-green-400' },
  error: { icon: XCircleIcon, iconColor: 'text-red-400' },
  warning: { icon: ExclamationTriangleIcon, iconColor: 'text-yellow-400' },
  info: { icon: InformationCircleIcon, iconColor: 'text-blue-400' },
};

import React from 'react';

export function Toast({ message, onClose }: ToastProps) {
  const [show, setShow] = useState(true);
  const variant = message.variant ?? 'info';
  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(message.id), 300);
  };

  return (
    <Transition show={show}>
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon aria-hidden="true" className={`h-6 w-6 ${config.iconColor}`} />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{message.title}</p>
              {message.description && (
                <p className="mt-1 text-sm text-gray-500">{message.description}</p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const positionClasses: Record<string, string> = {
  'top-right': 'top-0 right-0 sm:items-end sm:p-6 items-end px-4 py-6',
  'top-left': 'top-0 left-0 sm:items-start sm:p-6 items-start px-4 py-6',
  'bottom-right': 'bottom-0 right-0 sm:items-end sm:p-6 items-end px-4 py-6',
  'bottom-left': 'bottom-0 left-0 sm:items-start sm:p-6 items-start px-4 py-6',
};

export function ToastContainer({
  messages,
  onClose,
  position = 'top-right',
}: ToastContainerProps) {
  return (
    <div
      aria-live="assertive"
      className={`pointer-events-none fixed inset-0 flex flex-col z-50 ${positionClasses[position]}`}
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {messages.map((msg) => (
          <Toast key={msg.id} message={msg} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

let toastIdCounter = 0;

export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addToast = useCallback(
    (msg: Omit<ToastMessage, 'id'>, durationMs = 4000) => {
      const id = String(++toastIdCounter);
      setMessages((prev) => [...prev, { ...msg, id }]);
      if (durationMs > 0) {
        setTimeout(() => removeToast(id), durationMs);
      }
    },
    [removeToast]
  );

  return { messages, addToast, removeToast };
}

export default Toast;
