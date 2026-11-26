import React, { useState, FormEventHandler } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
  Mail,
  Lock,
  User,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

interface AuthPortalShellProps {
  initialMode: 'login' | 'register';
  status?: string;
  canResetPassword?: boolean;
}

export default function AuthPortalShell({
  initialMode,
  status,
  canResetPassword = true,
}: AuthPortalShellProps) {
  const page = usePage();
  const flashSuccess = (page.props as any)?.flash?.success;
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [focusedField, setFocusedField] = useState<string>(
    initialMode === 'login' ? 'login-email' : 'reg-name'
  );
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  // Laravel Inertia Login Form
  const loginForm = useForm({
    email: 'admin@cerminkreatif.com',
    password: 'password123',
    remember: true as boolean,
  });

  // Laravel Inertia Register Form
  const registerForm = useForm({
    name: params?.get('name') || '',
    email: params?.get('email') || '',
    password: '',
    password_confirmation: '',
  });

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const getPasswordStrength = (pw: string) => {
    if (!pw) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 1;
    if (pw.length >= 6) score = 2;
    if (pw.length >= 8 && /[A-Z0-9]/.test(pw)) score = 3;
    if (pw.length >= 10 && /[^A-Za-z0-9]/.test(pw)) score = 4;
    const map: Record<number, { label: string; color: string }> = {
      1: { label: 'Lemah', color: 'bg-rose-400' },
      2: { label: 'Cukup', color: 'bg-amber-400' },
      3: { label: 'Kuat', color: 'bg-[#3B9BF8]' },
      4: { label: 'Sangat Kuat', color: 'bg-emerald-500' },
    };
    return { score, ...map[score] };
  };

  const regPwStrength = getPasswordStrength(registerForm.data.password);

  const fillDemoAdmin = () => {
    loginForm.setData({
      email: 'admin@cerminkreatif.com',
      password: 'password123',
      remember: true,
    });
  };

  const fillDemoClient = () => {
    loginForm.setData({
      email: 'budi@mavencoffee.id',
      password: 'password123',
      remember: true,
    });
  };

  const handleLoginSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    loginForm.post(route('login'), {
      onFinish: () => loginForm.reset('password'),
    });
  };

  const handleRegisterSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    registerForm.post(route('register'), {
      onFinish: () => registerForm.reset('password', 'password_confirmation'),
    });
  };

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setFocusedField(nextMode === 'login' ? 'login-email' : 'reg-name');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 sm:p-8 lg:p-12 font-sans antialiased bg-[#F0F4F8]">
      <Head
        title={
          mode === 'login'
            ? 'Masuk — Cermin Kreatif Portal'
            : 'Daftar — Cermin Kreatif Portal'
        }
      />

      {/* OUTER GEOMETRIC SPLIT BACKGROUND (Airy-Blue Theme) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[52%] h-[52%] bg-[#3B9BF8]" />
        <div className="absolute bottom-0 left-0 w-[48%] h-[48%] bg-[#3B9BF8]" />
        <div className="absolute top-[7%] left-[2%] w-24 h-24 rounded-full bg-[#3B9BF8]/90" />
        <div className="absolute top-[3%] left-[35%] w-10 h-10 rounded-full bg-[#93C5FD]" />
        <div className="absolute -bottom-12 right-[4%] w-44 h-44 rounded-full bg-[#BFDBFE]" />
      </div>

      {/* MAIN CENTERED AUTHENTICATION CARD */}
      <div className="relative z-10 w-full max-w-[1040px] bg-white rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] overflow-hidden flex flex-col lg:flex-row min-h-[610px]">
        {/* LEFT COLUMN: FORM PANEL */}
        <div className="relative flex-1 lg:w-[60%] bg-white px-6 sm:px-12 py-8 sm:py-10 flex flex-col justify-between overflow-hidden">
          {/* Subtle Decorative Elements */}
          <svg
            className="pointer-events-none hidden sm:block absolute top-14 right-14 w-9 h-9 opacity-60"
            viewBox="0 0 40 40"
          >
            <defs>
              <pattern
                id="diagStripeAiryBlue"
                width="5"
                height="5"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="5"
                  stroke="#93C5FD"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <circle cx="20" cy="20" r="18" fill="url(#diagStripeAiryBlue)" />
          </svg>

          <div className="pointer-events-none hidden sm:block absolute top-[38%] left-10 w-7 h-7 rounded-full bg-[#EFF7FF]" />

          <svg
            className="pointer-events-none hidden sm:block absolute bottom-3 left-0 w-16 h-24 opacity-45"
            viewBox="0 0 64 96"
            fill="none"
          >
            <path
              d="M-8 30 L42 -10 M-8 50 L48 4 M-8 70 L52 20 M-8 90 L52 40 M-2 104 L52 60"
              stroke="#93C5FD"
              strokeWidth="1.4"
            />
          </svg>

          {/* Top-Left Brand Logo (Cermin Kreatif) */}
          <div className="flex items-center justify-between relative z-10">
            <Link href="/" className="flex items-center gap-2.5 text-left group">
              <img
                src="/images/cermin-logo.png"
                alt="Cermin Kreatif Logo"
                className="w-9 h-9 rounded-full object-cover shrink-0 shadow-sm border border-slate-200/80"
              />
              <div className="leading-none">
                <span className="block text-[17px] font-bold text-[#1E293B] tracking-tight">
                  Cermin Kreatif
                </span>
                <span className="block text-[10px] font-semibold text-[#3B9BF8] mt-0.5 tracking-wide">
                  Agency OS
                </span>
              </div>
            </Link>

            {/* Mobile Mode Switch Pill */}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === 'login' ? 'register' : 'login')
              }
              className="lg:hidden text-xs font-semibold text-[#3B9BF8] bg-[#EFF7FF] px-3.5 py-1.5 rounded-full cursor-pointer"
            >
              {mode === 'login' ? 'Daftar' : 'Masuk'}
            </button>
          </div>

          {/* Center Form Body */}
          <div className="w-full max-w-[360px] mx-auto my-8 relative z-10">
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div className="text-center space-y-2">
                  <h1 className="text-[25px] sm:text-[27px] font-bold text-[#1E293B] tracking-tight">
                    Masuk ke Cermin OS
                  </h1>
                  <p className="text-[11.5px] text-slate-400">
                    Portal Kolaborasi Klien &amp; Pusat Komando Agensi
                  </p>
                </div>

                {/* Quick Demo Role Fillers */}
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      loginForm.data.email === 'admin@cerminkreatif.com'
                        ? 'bg-[#EFF7FF] text-[#3B9BF8]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Demo Admin
                  </button>
                  <button
                    type="button"
                    onClick={fillDemoClient}
                    className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      loginForm.data.email === 'budi@mavencoffee.id'
                        ? 'bg-[#EFF7FF] text-[#3B9BF8]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Demo Klien
                  </button>
                </div>

                {status && (
                  <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl">
                    {status}
                  </div>
                )}

                {/* Stacked Joined Input Card */}
                <div className="border border-slate-200/90 rounded-xl overflow-hidden divide-y divide-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
                  {/* Email Row */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-3 transition-colors ${
                      focusedField === 'login-email'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <Mail className="w-[18px] h-[18px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="login-email"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Alamat Email
                      </label>
                      <input
                        id="login-email"
                        type="email"
                        required
                        autoComplete="username"
                        value={loginForm.data.email}
                        onFocus={() => setFocusedField('login-email')}
                        onChange={(e) =>
                          loginForm.setData('email', e.target.value)
                        }
                        placeholder="nama@brandanda.id"
                        className="w-full bg-transparent border-0 p-0 text-[13px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {isValidEmail(loginForm.data.email) && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Password Row */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-3 transition-colors ${
                      focusedField === 'login-password'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <Lock className="w-[18px] h-[18px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="login-password"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Kata Sandi
                      </label>
                      <input
                        id="login-password"
                        type={showLoginPass ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={loginForm.data.password}
                        onFocus={() => setFocusedField('login-password')}
                        onChange={(e) =>
                          loginForm.setData('password', e.target.value)
                        }
                        placeholder="••••••••••"
                        className="w-full bg-transparent border-0 p-0 text-[13px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0 tracking-wider"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLoginPass((v) => !v)}
                      className="text-slate-400 hover:text-[#3B9BF8] p-0.5 transition-colors cursor-pointer"
                      aria-label="Tampilkan kata sandi"
                    >
                      {showLoginPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {(loginForm.errors.email || loginForm.errors.password) && (
                  <div className="text-[11.5px] text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl space-y-0.5">
                    {loginForm.errors.email && <p>{loginForm.errors.email}</p>}
                    {loginForm.errors.password && (
                      <p>{loginForm.errors.password}</p>
                    )}
                  </div>
                )}

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      loginForm.setData('remember', !loginForm.data.remember)
                    }
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                        loginForm.data.remember
                          ? 'bg-[#3B9BF8] text-white'
                          : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {loginForm.data.remember && (
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      )}
                    </span>
                    Ingat saya
                  </button>

                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="font-semibold text-[#3B9BF8] hover:underline"
                    >
                      Lupa kata sandi?
                    </Link>
                  )}
                </div>

                {/* Sign In Pill Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={loginForm.processing}
                    className="w-48 py-2.5 rounded-full bg-[#3B9BF8] hover:bg-[#2589F5] disabled:opacity-70 text-white text-[13px] font-semibold shadow-[0_8px_20px_rgba(59,155,248,0.32)] transition-all cursor-pointer"
                  >
                    {loginForm.processing ? 'Memproses...' : 'Masuk Sekarang'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="text-center space-y-1.5">
                  <h1 className="text-[25px] sm:text-[27px] font-bold text-[#1E293B] tracking-tight">
                    Buat Akun Portal
                  </h1>
                  <p className="text-[11.5px] text-slate-400">
                    Daftar dengan email bisnis Anda untuk mengakses Client Portal
                  </p>
                </div>

                {flashSuccess && (
                  <div className="rounded-xl bg-[#EFF7FF] border border-[#3B9BF8]/30 p-3 text-xs text-[#1E293B] leading-relaxed">
                    <strong className="text-[#3B9BF8] block mb-0.5">
                      Brief Berhasil Tercatat
                    </strong>
                    {flashSuccess}
                  </div>
                )}

                {/* Stacked Joined Input Card */}
                <div className="border border-slate-200/90 rounded-xl overflow-hidden divide-y divide-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
                  {/* Full Name */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${
                      focusedField === 'reg-name'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <User className="w-[17px] h-[17px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="reg-name"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={registerForm.data.name}
                        onFocus={() => setFocusedField('reg-name')}
                        onChange={(e) =>
                          registerForm.setData('name', e.target.value)
                        }
                        placeholder="cth. Hendra Wijaya"
                        className="w-full bg-transparent border-0 p-0 text-[12.5px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {registerForm.data.name.trim().length >= 3 && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${
                      focusedField === 'reg-email'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <Mail className="w-[17px] h-[17px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="reg-email"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Alamat Email Bisnis
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        autoComplete="username"
                        value={registerForm.data.email}
                        onFocus={() => setFocusedField('reg-email')}
                        onChange={(e) =>
                          registerForm.setData('email', e.target.value)
                        }
                        placeholder="nama@brandanda.id"
                        className="w-full bg-transparent border-0 p-0 text-[12.5px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {isValidEmail(registerForm.data.email) && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${
                      focusedField === 'reg-password'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <Lock className="w-[17px] h-[17px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="reg-password"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Buat Kata Sandi
                      </label>
                      <input
                        id="reg-password"
                        type={showRegPass ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={registerForm.data.password}
                        onFocus={() => setFocusedField('reg-password')}
                        onChange={(e) =>
                          registerForm.setData('password', e.target.value)
                        }
                        placeholder="Minimal 8 karakter"
                        className="w-full bg-transparent border-0 p-0 text-[12.5px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRegPass((v) => !v)}
                      className="text-slate-400 hover:text-[#3B9BF8] p-0.5 transition-colors cursor-pointer"
                      aria-label="Tampilkan kata sandi"
                    >
                      {showRegPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div
                    className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${
                      focusedField === 'reg-confirm'
                        ? 'bg-[#EFF7FF]/70'
                        : 'bg-white'
                    }`}
                  >
                    <Lock className="w-[17px] h-[17px] text-slate-400 shrink-0 stroke-[1.7]" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor="reg-confirm"
                        className="block text-[9.5px] font-semibold text-slate-400 leading-none mb-1"
                      >
                        Konfirmasi Kata Sandi
                      </label>
                      <input
                        id="reg-confirm"
                        type={showRegConfirmPass ? 'text' : 'password'}
                        required
                        autoComplete="new-password"
                        value={registerForm.data.password_confirmation}
                        onFocus={() => setFocusedField('reg-confirm')}
                        onChange={(e) =>
                          registerForm.setData(
                            'password_confirmation',
                            e.target.value
                          )
                        }
                        placeholder="Ulangi kata sandi"
                        className="w-full bg-transparent border-0 p-0 text-[12.5px] font-medium text-[#1E293B] placeholder:text-slate-300 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPass((v) => !v)}
                      className="text-slate-400 hover:text-[#3B9BF8] p-0.5 transition-colors cursor-pointer"
                      aria-label="Tampilkan konfirmasi kata sandi"
                    >
                      {showRegConfirmPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Password Strength Indicator */}
                {registerForm.data.password && (
                  <div className="space-y-1">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-1 rounded-full transition-all ${
                            regPwStrength.score >= lvl
                              ? regPwStrength.color
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Kekuatan kata sandi</span>
                      <span className="font-semibold text-slate-600">
                        {regPwStrength.label}
                      </span>
                    </p>
                  </div>
                )}

                {(registerForm.errors.name ||
                  registerForm.errors.email ||
                  registerForm.errors.password ||
                  registerForm.errors.password_confirmation) && (
                  <div className="text-[11.5px] text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl space-y-0.5">
                    {registerForm.errors.name && <p>{registerForm.errors.name}</p>}
                    {registerForm.errors.email && (
                      <p>{registerForm.errors.email}</p>
                    )}
                    {registerForm.errors.password && (
                      <p>{registerForm.errors.password}</p>
                    )}
                    {registerForm.errors.password_confirmation && (
                      <p>{registerForm.errors.password_confirmation}</p>
                    )}
                  </div>
                )}

                {/* Submit Pill Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={registerForm.processing}
                    className="w-48 py-2.5 rounded-full bg-[#3B9BF8] hover:bg-[#2589F5] disabled:opacity-70 text-white text-[13px] font-semibold shadow-[0_8px_20px_rgba(59,155,248,0.32)] transition-all cursor-pointer"
                  >
                    {registerForm.processing ? 'Mendaftarkan...' : 'Daftar Akun'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Security & Back Link */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B9BF8]" />
              <span>Protected by Cermin Agency OS</span>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-[#3B9BF8] transition-colors font-medium"
            >
              <ArrowLeft className="w-3 h-3" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: AIRY-BLUE WELCOME / MODE-SWITCH PANEL */}
        <div className="relative lg:w-[40%] bg-[#3B9BF8] text-white px-8 py-8 sm:py-10 flex flex-col justify-between overflow-hidden">
          {/* Translucent Geometric Ornaments */}
          <div
            className="pointer-events-none absolute -top-10 -right-12 w-56 h-56 bg-white/10 rotate-12"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 85%)' }}
          />
          <div className="pointer-events-none hidden lg:block absolute top-[48%] -left-6 w-12 h-12 bg-[#93C5FD]/40 rotate-[28deg]" />
          <div className="pointer-events-none absolute bottom-[22%] left-[26%] w-12 h-12 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute top-[54%] right-7 grid grid-cols-3 gap-3 opacity-35">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </div>
          <svg
            className="pointer-events-none absolute -bottom-8 -right-6 w-28 h-28 opacity-25"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id="diagStripeWhiteAuth"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                />
              </pattern>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#diagStripeWhiteAuth)" />
          </svg>

          {/* Top Navigation Links */}
          <nav className="relative z-10 flex items-center justify-center lg:justify-end gap-6 text-[11.5px] font-medium text-white/90">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <Link
              href="/our-clients"
              className="hover:text-white transition-colors"
            >
              Klien Kami
            </Link>
            <Link
              href="/portfolio"
              className="hover:text-white transition-colors"
            >
              Portofolio
            </Link>
          </nav>

          {/* Centered CTA Content */}
          <div className="relative z-10 my-10 lg:my-0 text-center space-y-4 max-w-[270px] mx-auto">
            <h2 className="text-[28px] sm:text-[30px] font-bold tracking-tight leading-tight">
              {mode === 'login' ? 'Baru di Sini?' : 'Selamat Datang!'}
            </h2>
            <p className="text-[12px] text-white/90 leading-relaxed">
              {mode === 'login'
                ? 'Buat akun Client Portal untuk memantau progres konten, jadwal tayang, serta hasil desain brand Anda.'
                : 'Sudah punya akun Cermin Agency OS? Masuk kembali untuk meninjau draf konten dan progres produksi.'}
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() =>
                  switchMode(mode === 'login' ? 'register' : 'login')
                }
                className="w-40 py-2.5 rounded-full bg-white hover:bg-[#EFF7FF] text-[#3B9BF8] text-[13px] font-semibold shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition-all cursor-pointer"
              >
                {mode === 'login' ? 'Daftar Akun' : 'Masuk'}
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block h-4" />
        </div>
      </div>
    </div>
  );
}

