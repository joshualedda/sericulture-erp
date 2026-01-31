import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

// Layouts/GuestLayout.jsx

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    {/* Lakihan natin dito: w-48 o w-56 para talagang kitang-kita */}
                    <ApplicationLogo className="w-48 h-auto fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
