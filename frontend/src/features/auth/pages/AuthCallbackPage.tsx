import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Alert, Card } from '@/components';
import { getCurrentUser } from '@/features/auth/authApi';
import type { AuthRole } from '@/features/auth/types';

const roleRouteMap: Record<AuthRole, string> = {
  STUDENT: '/student/dashboard',
  FACULTY: '/faculty/dashboard',
  REGISTRAR: '/registrar/dashboard',
  BUSINESS_OFFICE: '/businessOffice/dashboard',
  ADMIN: '/superAdmin/dashboard',
  ACCOUNTING_STAFF: '/businessOffice/dashboard',
  HS_FORMATOR: '/faculty/dashboard',
  GS_FORMATOR: '/faculty/dashboard',
  GUIDANCE: '/faculty/dashboard',
};

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const externalError = useMemo(() => searchParams.get('error'), [searchParams]);

  useEffect(() => {
    if (externalError) {
      navigate(`/login?error=${encodeURIComponent(externalError)}`, { replace: true });
      return;
    }

    let active = true;

    async function resolveSession() {
      try {
        const result = await getCurrentUser();

        if (!active) return;

        if (!result.authenticated || !result.roleCode) {
          navigate('/login?error=Your%20session%20could%20not%20be%20resolved.', { replace: true });
          return;
        }

        const targetRoute = roleRouteMap[result.roleCode];
        navigate(targetRoute, { replace: true });
      } catch {
        if (!active) return;
        setErrorMessage('We could not finish signing you in. Please try again.');
      }
    }

    void resolveSession();

    return () => {
      active = false;
    };
  }, [externalError, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="space-y-4 p-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Completing sign-in</h1>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;re loading your account and routing you to the correct workspace.
            </p>
          </div>

          {errorMessage ? (
            <Alert
              variant="error"
              title="Authentication error"
              message={errorMessage}
            />
          ) : (
            <div className="text-sm text-gray-500">Please wait a moment…</div>
          )}
        </div>
      </Card>
    </div>
  );
}
