import React, { useState } from 'react';
import {
    LayoutDashboard,
    Store,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    MessageCircle,
    ReceiptText,
    WalletCards,
    Bell,
    Settings,
    Sprout,
    Menu,
    X,
    CheckCircle2
} from 'lucide-react';

export default function InvestorNavigation({
    investor = {},
    currentPath = '/investor/dashboard',
    onNavigate = () => { }
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Daftar menu sesuai spesifikasi routing dan icon lucide-react
    const menuItems = [
        { name: "Dashboard", path: "/investor/dashboard", icon: LayoutDashboard },
        { name: "Marketplace", path: "/investor/marketplace", icon: Store },
        { name: "Investasi", path: "/investor/investments", icon: BriefcaseBusiness },
        { name: "Portofolio", path: "/investor/portfolio", icon: ChartNoAxesCombined },
        { name: "Pesan", path: "/investor/chat", icon: MessageCircle },
        { name: "Transaksi", path: "/investor/transactions", icon: ReceiptText },
        { name: "Dompet", path: "/investor/wallet", icon: WalletCards },
        { name: "Notifikasi", path: "/investor/notifications", icon: Bell },
        { name: "Pengaturan", path: "/investor/settings", icon: Settings }
    ];

    const handleNavigation = (path) => {
        onNavigate(path);
        setIsMobileOpen(false); // Tutup menu mobile setelah navigasi
    };

    return (
        <>
            {/* =========================================================================
          1. DESKTOP VIEW: HORIZONTAL NAVBAR (PC / LAPTOP >= 1024px)
          ========================================================================= */}
            <nav className="hidden lg:flex w-full bg-[#064E3B] text-white px-6 py-3 items-center justify-between border-b border-[#043E2F] sticky top-0 z-50 shadow-md">

                {/* Logo & Brand */}
                <div className="flex items-center gap-3">
                    <div className="bg-[#D97706]/10 p-2 rounded-lg border border-[#D97706]/30 flex items-center justify-center shadow-inner">
                        <Sprout className="w-5 h-5 text-[#D97706]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-gray-100 to-[#D97706] bg-clip-text text-transparent leading-none">
                            AgroInvest
                        </span>
                        <span className="text-[8px] text-[#D97706]/80 tracking-wider uppercase font-semibold mt-0.5">
                            Smart Agricultural Investment
                        </span>
                    </div>
                </div>

                {/* Menu Navigasi Horisontal */}
                <div className="flex items-center gap-1 xl:gap-2">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-xs xl:text-sm font-medium ${isActive
                                        ? 'bg-[#059669] text-white border-b-2 border-[#D97706] shadow-sm'
                                        : 'text-gray-300 hover:bg-[#043E2F] hover:text-[#D97706]'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D97706]' : 'text-gray-300'}`} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Profil Investor Mini */}
                <div className="flex items-center gap-3 border-l border-[#043E2F] pl-5">
                    <div className="text-right">
                        <h4 className="text-sm font-semibold truncate max-w-[120px] text-white leading-tight">
                            {investor?.name || "Budi Santoso"}
                        </h4>
                        <span className="inline-flex items-center gap-0.5 mt-0.5 bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/20 px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wide uppercase">
                            Verified
                        </span>
                    </div>

                    <div className="relative flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('/investor/settings')}>
                        <img
                            src={investor?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                            alt={investor?.name || "Investor"}
                            className="w-9 h-9 rounded-lg object-cover ring-2 ring-[#D97706]/40 shadow"
                        />
                        {investor?.kycStatus === 'Verified' && (
                            <span className="absolute -bottom-1 -right-1 bg-[#D97706] text-[#064E3B] p-0.5 rounded-full ring-1 ring-[#064E3B]">
                                <CheckCircle2 className="w-3 h-3 fill-current" />
                            </span>
                        )}
                    </div>
                </div>

            </nav>

            {/* =========================================================================
          2. MOBILE VIEW: TOP BAR & SLIDE-OUT SIDEBAR (MOBILE / TABLET < 1024px)
          ========================================================================= */}
            <div className="lg:hidden flex items-center justify-between bg-[#064E3B] text-white p-4 shadow-md sticky top-0 z-40 border-b border-[#043E2F]">
                <div className="flex items-center gap-2.5">
                    <div className="bg-[#D97706]/10 p-1.5 rounded-lg border border-[#D97706]/20">
                        <Sprout className="w-5 h-5 text-[#D97706]" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">AgroInvest</span>
                </div>

                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 bg-[#043E2F] rounded-lg text-white hover:text-[#D97706] transition-colors focus:outline-none"
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Drawer Sidebar Mobile */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop gelap */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Panel Sidebar Bergerak dari Kiri */}
                    <div className="fixed inset-y-0 left-0 w-72 max-w-xs flex flex-col bg-[#064E3B] text-white shadow-2xl z-50 animate-slide-in">

                        {/* Header Sidebar (Tombol Close) */}
                        <div className="p-5 border-b border-[#043E2F] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Sprout className="w-5 h-5 text-[#D97706]" />
                                <span className="font-bold text-base">AgroInvest Mobile</span>
                            </div>
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-1.5 bg-[#043E2F] rounded-lg text-white hover:text-red-400 transition-colors"
                                aria-label="Close Menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Menu Navigasi Vertikal */}
                        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                            {menuItems.map((item) => {
                                const isActive = currentPath === item.path;
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-[#059669] text-white font-medium border-l-4 border-[#D97706]'
                                                : 'text-gray-300 hover:bg-[#043E2F] hover:text-[#D97706]'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#D97706]' : 'text-gray-300'}`} />
                                        <span className="text-sm">{item.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Bagian Profil Bawah Sidebar */}
                        <div className="p-4 border-t border-[#043E2F] bg-[#033B2C]/50 flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={investor?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                                    alt={investor?.name || "Investor"}
                                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#D97706]/40 shadow-md"
                                />
                                {investor?.kycStatus === 'Verified' && (
                                    <span className="absolute -bottom-1 -right-1 bg-[#D97706] text-[#064E3B] p-0.5 rounded-full ring-1 ring-[#064E3B]">
                                        <CheckCircle2 className="w-3 h-3 fill-current" />
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold truncate text-white leading-tight">
                                    {investor?.name || "Budi Santoso"}
                                </h4>
                                <div className="mt-1 flex items-center">
                                    <span className="bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/20 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase flex items-center gap-0.5">
                                        Verified Investor
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}