import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8 text-center">
                <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
                <p className="text-sm text-slate-500 mt-2">Please enter your details to sign in.</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-700 font-bold" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-bold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-500 underline"
                            >
                                Forgot Password?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ms-2 text-sm text-slate-600 font-medium cursor-pointer select-none">Remember this device</span>
                </div>

                <PrimaryButton 
                    className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl" 
                    disabled={processing}
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </PrimaryButton>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    Don't have an account yet?{' '}
                    <Link href={route('register')} className="text-indigo-600 font-black hover:underline">
                        Create an Account
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}