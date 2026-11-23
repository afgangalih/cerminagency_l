import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'admin@cerminkreatif.com',
        password: 'password123',
        remember: true as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillDemoAdmin = () => {
        setData({
            email: 'admin@cerminkreatif.com',
            password: 'password123',
            remember: true,
        });
    };

    const fillDemoClient = () => {
        setData({
            email: 'budi@mavencoffee.id',
            password: 'password123',
            remember: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — Cermin Kreatif Portal" />

            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Beranda</span>
                </Link>

                <div className="text-center mt-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-md text-base tracking-tight">
                        CK
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                        Cermin Kreatif Platform
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 font-light">
                        Portal Kolaborasi Klien & Pusat Komando Agensi
                    </p>
                </div>
            </div>

            {/* Quick Demo Role Fillers */}
            <div className="mb-5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-[10px] font-inter uppercase text-zinc-400 block mb-2 font-medium">
                    Akses Cepat Demo (1-Klik Isi Kredensial)
                </span>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={fillDemoAdmin}
                        className="py-1.5 px-2.5 rounded-lg text-[11px] font-medium bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition text-center shadow-xs cursor-pointer"
                    >
                        Masuk Akun Admin
                    </button>
                    <button
                        type="button"
                        onClick={fillDemoClient}
                        className="py-1.5 px-2.5 rounded-lg text-[11px] font-medium bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition text-center shadow-xs cursor-pointer"
                    >
                        Masuk Akun Klien
                    </button>
                </div>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-zinc-500 hover:text-zinc-900 underline"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs text-zinc-600">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-2.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 rounded-xl"
                        disabled={processing}
                    >
                        {processing ? 'Memverifikasi...' : 'Masuk ke Platform'}
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2">
                    <span className="text-xs text-zinc-500 font-light">
                        Belum punya akun brand?{' '}
                        <Link
                            href="/#brief-section"
                            className="font-medium text-zinc-900 hover:underline"
                        >
                            Isi formulir brief di sini
                        </Link>
                    </span>
                </div>
            </form>
        </GuestLayout>
    );
}
