'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const ConditionalLayout = ({ children }) => {
    const pathname = usePathname();
    
    // Check if current path is sandbox, dashboard, or any sandbox subpage
    const isSandboxPage = pathname?.startsWith('/sandbox');
    const isDashboardPage = pathname?.startsWith('/dashboard');
    const isLoginPage = pathname === '/login';
    const isRegisterPage = pathname === '/register';
    
    if (isSandboxPage || isDashboardPage) {
        // For sandbox and dashboard pages, render children without navbar/footer
        return <>{children}</>;
    }
    
    if (isLoginPage || isRegisterPage) {
        // For login and register pages, render without navbar and footer for clean auth experience
        return <>{children}</>;
    }
    
    // For all other pages, render with navbar and footer
    return (
        <>
            <Navbar />
            <main className="pt-[70px]">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default ConditionalLayout;
