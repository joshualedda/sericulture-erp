import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const closeModal = () => { setConfirmingUserDeletion(false); clearErrors(); reset(); };

    return (
        <section className={`bg-rose-50/50 p-8 rounded-3xl border border-rose-100 shadow-sm ${className}`}>
            <header className="mb-6">
                <h2 className="text-xl font-black text-rose-700 tracking-tight uppercase">Danger Zone</h2>
                <p className="mt-1 text-sm text-rose-600/80 font-medium leading-relaxed">
                    Once your account is deleted, all resources and data will be permanently removed. Please back up any important information.
                </p>
            </header>

            <button onClick={() => setConfirmingUserDeletion(true)} className="px-6 py-2.5 bg-rose-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={(e) => { e.preventDefault(); destroy(route('profile.destroy'), { preserveScroll: true, onSuccess: () => closeModal(), onError: () => passwordInput.current.focus(), onFinish: () => reset() }); }} className="p-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Are you absolutely sure?</h2>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed">This action cannot be undone. Please enter your password to confirm permanent deletion of your account.</p>

                    <div className="mt-6">
                        <TextInput id="password" type="password" name="password" ref={passwordInput} value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full bg-slate-50 py-3" isFocused placeholder="Type your password to confirm..." />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="rounded-xl border-slate-200">Wait, Go Back</SecondaryButton>
                        <button disabled={processing} className="px-6 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all disabled:opacity-50">
                            Yes, Delete My Account
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}