import React, { useState, useEffect } from 'react';
import {
    Sprout,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Boxes,
    Wallet,
    ChartLine,
    Landmark,
    FileText,
    Bell,
    ChevronDown,
    Menu,
    X,
    Settings,
    LogOut,
    User,
    Shield,
    FileCheck,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function AgroFinanceNavigation() {
    const [activeTab, setActiveTab] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();


    // Deteksi scroll untuk efek glassmorphism navbar desktop
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menu Navigasi Utama
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Produk', icon: Package },
        { name: 'Pesanan', icon: ShoppingCart },
        { name: 'Inventaris', icon: Boxes },
        { name: 'Keuangan', icon: Wallet },
        { name: 'Analisis', icon: ChartLine },
        { name: 'Investasi', icon: Landmark },
        { name: 'Laporan', icon: FileText },
    ];

    // Simulasi Data Notifikasi Keuangan Agribisnis
    const mockNotifications = [
        { id: 1, title: 'Dana Investasi Masuk', desc: 'Dana modal kerja Rp25.000.000 telah diverifikasi.', time: '5 mnt lalu', unread: true },
        { id: 2, title: 'Batas Stok Minimum', desc: 'Stok Pupuk Organik Urea di bawah 10 karung.', time: '1 jam lalu', unread: true },
        { id: 3, title: 'Laporan Pajak Q2', desc: 'Neraca keuangan kuartal 2 siap untuk diunduh.', time: '1 hari lalu', unread: false },
    ];

    return (
        <div className=" min-h-15 bg-stone-50 text-stone-800">

            {/* ========================================== */}
            {/* DESKTOP NAVBAR (>= 1024px)         */}
            {/* ==========================================  */}
            <nav className={`hidden lg:flex fixed top-0 left-0 right-0 h-20 items-center justify-between px-8 z-40 transition-all duration-300 border-b ${scrolled
                ? 'bg-white/80 backdrop-blur-md border-stone-200/80 shadow-md shadow-stone-100/50'
                : 'bg-white border-stone-100 shadow-sm'
                }`}>
                {/* Sektor Kiri: Logo & Identitas */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-700/20">
                        <Sprout className="text-white" size={24} />
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                            AgroFinance
                        </span>
                        <p className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase leading-none mt-0.5">
                            Sistem Akuntansi Vendor
                        </p>
                    </div>
                </div>

                {/* Sektor Tengah: Menu Navigasi Desktop */}
                <div className="flex items-center gap-1.5 xl:gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isTabActive = activeTab === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(`/${item.name}Vendor`);
                                    setActiveTab(item.name);
                                    setProfileDropdownOpen(false);
                                    setNotifDropdownOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 group ${isTabActive
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20 scale-[1.02]'
                                    : 'text-stone-600 hover:bg-emerald-50 hover:text-emerald-700'
                                    }`}
                            >
                                <Icon size={16} className={`transition-transform duration-300 ${isTabActive ? 'text-white' : 'text-stone-400 group-hover:scale-110 group-hover:text-emerald-600'}`} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Sektor Kanan: Area Aksi (Notifikasi & Profil) */}
                <div className="flex items-center gap-4">

                    {/* Tombol Notifikasi */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setNotifDropdownOpen(!notifDropdownOpen);
                                setProfileDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-xl border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-all shadow-sm relative ${notifDropdownOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}`}
                        >
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* Dropdown Notifikasi */}
                        {notifDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white border border-stone-200/80 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
                                <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                                    <span className="font-bold text-xs text-stone-800">Notifikasi Finansial</span>
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full font-bold">2 Baru</span>
                                </div>
                                <div className="divide-y divide-stone-50 max-h-72 overflow-y-auto">
                                    {mockNotifications.map((n) => (
                                        <div key={n.id} className={`p-4 hover:bg-stone-50/60 transition-colors cursor-pointer ${n.unread ? 'bg-emerald-50/10' : ''}`}>
                                            <div className="flex justify-between items-start gap-1">
                                                <span className={`font-semibold text-xs ${n.unread ? 'text-emerald-950' : 'text-stone-700'}`}>{n.title}</span>
                                                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></span>}
                                            </div>
                                            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{n.desc}</p>
                                            <span className="text-[9px] text-stone-400 font-semibold mt-2 block">{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full text-center py-3 bg-stone-50 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors border-t border-stone-100">
                                    Lihat Semua Notifikasi
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-[1px] bg-stone-200"></div>

                    {/* Profil Menu Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setProfileDropdownOpen(!profileDropdownOpen);
                                setNotifDropdownOpen(false);
                            }}
                            className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-stone-200 hover:bg-stone-50 transition-all shadow-sm ${profileDropdownOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}`}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                                alt="Avatar"
                                className="w-8 h-8 rounded-full object-cover shadow-inner"
                            />
                            <div className="text-left hidden xl:block">
                                <p className="text-xs font-bold text-stone-800 leading-none">CV Tani Makmur</p>
                                <p className="text-[9px] text-stone-400 font-semibold mt-0.5">Vendor Utama</p>
                            </div>
                            <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-stone-200/80 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
                                <div className="p-4 border-b border-stone-100 bg-stone-50/50">
                                    <p className="font-bold text-xs text-stone-800">CV Tani Makmur</p>
                                    <p className="text-[10px] text-stone-400 font-semibold mt-0.5">Sektor Hortikultura</p>
                                </div>
                                <div className="p-1.5">
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all">
                                        <User size={15} />
                                        <span>Profil Bisnis</span>
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all">
                                        <Settings size={15} />
                                        <span>Pengaturan Akun</span>
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all">
                                        <Shield size={15} />
                                        <span>Keamanan</span>
                                    </button>
                                </div>
                                <div className="p-1.5 border-t border-stone-100 bg-stone-50/40">
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                        <LogOut size={15} />
                                        <span>Keluar Aplikasi</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </nav>

            {/* ========================================== */}
            {/* MOBILE HEADER (< 1024px)
                ==========================================  */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200/60 shadow-sm flex items-center justify-between px-4 z-40">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
                >
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md">
                        <Sprout className="text-white" size={18} />
                    </div>
                    <span className="text-base font-bold tracking-tight text-emerald-950">
                        AgroFinance
                    </span>
                </div>

                <button className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
                </button>
            </header>

            {/* ==========================================
                    MOBILE SIDEBAR OVERLAY & PANEL
            ==========================================  */}
            {/* Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-stone-950/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <aside className={`h-screen flex flex-col lg:hidden fixed inset-y-0 left-0 w-72 bg-[#12372A] z-50 transition-transform duration-300 transform flex flex-col justify-between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className='overflow-y-auto flex-1'>
                    {/* Logo Sektor Atas */}
                    <div className="  h-20 flex items-center justify-between px-6 border-b border-emerald-900/60 bg-[#0d281e]">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <Sprout className="text-white" size={20} />
                            </div>
                            <div>
                                <span className="text-base font-bold tracking-tight text-white">
                                    AgroFinance
                                </span>
                                <p className="text-[9px] text-emerald-400 font-semibold tracking-wider uppercase leading-none mt-0.5">
                                    Akuntansi Agribisnis
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-lg hover:bg-emerald-900/50 text-emerald-300 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigasi Utama */}
                    <nav className=" px-4 py-6 space-y-1 ">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isTabActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(`/${item.name}Vendor`);
                                        setActiveTab(item.name);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold transition-all duration-200 relative group ${isTabActive
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 border-l-4 border-emerald-400 pl-3'
                                        : 'text-emerald-100/70 hover:bg-emerald-900/40 hover:text-white'
                                        }`}
                                >
                                    <Icon size={16} className={`transition-transform duration-200 group-hover:scale-110 ${isTabActive ? 'text-white' : 'text-emerald-400'}`} />
                                    <span>{item.name}</span>
                                    {isTabActive && (
                                        <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-md shadow-emerald-300/80"></span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Vendor Profile / Sektor Bawah */}
                <div className="shrink-0 w-full p-4 border-t border-emerald-900/60 bg-[#0d281e]">
                    <div className="flex items-center justify-between p-2 rounded-2xl bg-[#12372A]/50 border border-emerald-900/40">
                        <div className="flex items-center gap-2.5">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                                alt="Avatar"
                                className="w-10 h-10 rounded-xl object-cover border border-emerald-800"
                            />
                            <div className="text-left">
                                <p className="text-xs font-bold text-white">CV Tani Makmur</p>
                                <p className="text-[9px] text-emerald-400 font-semibold">Tani Hortikultura</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-xl hover:bg-emerald-900/40 text-emerald-300 hover:text-white transition-colors">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>
            </aside>


        </div>
    );
}