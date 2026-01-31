import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-8 text-center">
                {/* Icon Placeholder - Pwede mong palitan ng actual SVG icon */}
                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                </div>
                
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
                <p className="text-sm text-slate-500 mt-2 px-4">
                    No worries! Enter your email below and we'll send you a link to reset your password.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-center animate-pulse">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="name@example.com"
                        className="mt-1 block w-full bg-slate-50 border-slate-200 focus:bg-white transition-all text-center py-3"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-center" />
                </div>

                <div className="space-y-4">
                    <PrimaryButton 
                        className="w-full justify-center py-3.5 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl" 
                        disabled={processing}
                    >
                        {processing ? 'Sending Link...' : 'Send Reset Link'}
                    </PrimaryButton>

                    <div className="text-center">
                        <Link
                            href={route('login')}
                            className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}