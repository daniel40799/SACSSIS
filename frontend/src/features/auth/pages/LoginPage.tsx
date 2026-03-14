import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Button, Card, Checkbox } from '@/components';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  ACCOUNT_NOT_FOUND:
    'Your account is not registered in the student portal. Please contact the registrar.',
  ACCOUNT_INACTIVE:
    'Your account is inactive. You may have dropped or graduated. Please contact the registrar.',
  UNAUTHORIZED_DOMAIN:
    'Please use your official SACS school email address to sign in.',
  UNAUTHORIZED_USER:
    'This email is not registered in the system. Only authorized SACS users may access this portal.',
  PROVISIONING_FAILED:
    'We were unable to set up your account. Please contact the IT support team.',
  LOGIN_ERROR:
    'Sign-in failed. Please try again or contact support if the problem persists.',
};

const DEFAULT_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again.';

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('error');
  const errorBody = errorCode
    ? (AUTH_ERROR_MESSAGES[errorCode] ?? DEFAULT_ERROR_MESSAGE)
    : null;
  const message = errorBody
    ? { title: 'Sign-in failed', body: errorBody }
    : null;

  function handleGoogleSignIn() {
    window.location.assign('/oauth2/authorization/google');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/images/sacs-logo-with-text.svg"
          alt="SACS logo"
        />
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">STUDENT'S PORTAL</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {message ? (
          <Alert
            variant="error"
            title={message.title}
            message={message.body}
            className="mt-6 mb-6"
          />
        ) : null}

        <Card className="sm:rounded-lg" padding={false}>
          <form className="space-y-6 py-8 px-4 sm:px-10" onSubmit={(e) => e.preventDefault()}>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Login with your SACS .edu Email</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleGoogleSignIn}
                  className="w-full justify-center text-gray-500"
                  leadingIcon={(
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  )}
                >
                  <span className="sr-only">Sign in with Google</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember_me"
                label="Remember me"
                checked={rememberMe}
                onChange={setRememberMe}
              />

              <div className="text-sm">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc3LzQRwaxZpCm1GDp1EROhInVDylajfKUyjBrdyexMIpCfJQ/viewform"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}