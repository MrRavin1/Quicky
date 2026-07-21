import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Hero from '@/Components/Hero';
import Categories from '@/Components/Categories';
import Promotions from '@/Components/Promotions';
import Restaurants from '@/Components/Restaurants';
import Stores from '@/Components/Stores';
import Products from '@/Components/Products';
import Reviews from '@/Components/Reviews';
import Footer from '@/Components/Footer';

type WelcomeProps = {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
};

export default function Welcome({
    auth,
    canLogin,
    canRegister,
}: PageProps<WelcomeProps>) {
    return (
        <>
            <Head title="Quicky — Fast Delivery Across Nepal" />

            <div className="min-h-screen bg-white font-sans antialiased">
                <Header
                    auth={auth}
                    canLogin={canLogin}
                    canRegister={canRegister}
                />

                <main>
                    <Hero
                        auth={auth}
                        canRegister={canRegister}
                    />
                    <Categories />
                    <Promotions />
                    <Restaurants />
                    <Stores />
                    <Products />
                    <Reviews />
                </main>

                <Footer />
            </div>
        </>
    );
}
