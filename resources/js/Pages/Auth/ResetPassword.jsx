import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react'; //
import { 
    KeyIcon, 
    EnvelopeIcon, 
    ShieldCheckIcon, 
    EyeIcon, 
    EyeSlashIcon 
} from '@heroicons/react/24/outline';

export default function ResetPassword({ token, email }) {
    // State para sa show/hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
                    <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Set New Password</h2>
                <p className="text-sm text-slate-500 mt-2">Create a strong password for your D'SERICORE account.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-[10px] uppercase tracking-widest font-bold text-slate-400" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="pl-11 block w-full bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
                            readOnly
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="New Password" className="text-[10px] uppercase tracking-widest font-bold text-slate-400" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <KeyIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Dynamic type
                            name="password"
                            value={data.password}
                            className="pl-11 pr-12 block w-full border-slate-200 focus:ring-indigo-500 rounded-xl"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />

                        {/* Eye Toggle Button */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm New Password" className="text-[10px] uppercase tracking-widest font-bold text-slate-400" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <KeyIcon className="h-5 w-5 text-slate-400" />
                        </div>

                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'} // Dynamic type
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-11 pr-12 block w-full border-slate-200 focus:ring-indigo-500 rounded-xl"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="••••••••"
                        />

                        {/* Eye Toggle Button for Confirm */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl transition-all" 
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Reset Password'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}