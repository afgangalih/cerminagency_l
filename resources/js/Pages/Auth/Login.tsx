import AuthPortalShell from '@/Components/Auth/AuthPortalShell';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  return (
    <AuthPortalShell
      initialMode="login"
      status={status}
      canResetPassword={canResetPassword}
    />
  );
}
