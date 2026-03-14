import type { CurrentUserResponse } from '@/features/auth/types';

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    return { authenticated: false };
  }

  if (!response.ok) {
    throw new Error('Unable to load current user.');
  }

  return response.json() as Promise<CurrentUserResponse>;
}

export function startGoogleLogin(): void {
  window.location.assign('/oauth2/authorization/google');
}
