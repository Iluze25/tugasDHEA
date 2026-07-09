import React, { useState, useEffect } from 'react';
import {
    Wallet,
    ShoppingCart,
    Leaf,
    HandCoins,
    TrendingUp,
    AlertCircle,
    X,
    ArrowUpRight,
    Activity,
    HelpCircle
} from 'lucide-react';
import Navbar1 from "../../../components/vendor/navbar.jsx"
import Anal from "./analys.jsx"
import Racent from "./racent.jsx"

// ============================================================================
// 1. KOMPONEN PENDUKUNG: SUMMARY CARD (KARTU STATISTIK DENGAN ANIMASI HITUNG)
// ============================================================================
function SummaryCard({
    title,
    rawValue,
    valuePrefix = '',
    valueSuffix = '',
    desc,
    trendText,
    trendType = 'positive',
    icon: IconComponent,
    theme,
    onClick
}) {
    const [displayValue, setDisplayValue] = useState(0);

    // Animasi hitung angka (Count-up) saat komponen pertama kali dimuat
    useEffect(() => {
        let start = 0;
        const end = rawValue;
        if (start === end) return;

        const duration = 1000; // Durasi total animasi (1 detik)
        const stepTime = 16;   // Mengincar ~60 FPS
        const steps = duration / stepTime;
        const increment = (end - start) / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                setDisplayValue(end);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [rawValue]);

    // Format rupiah atau angka murni dengan pemisah ribuan
    const formatNumber = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    // Konfigurasi kelas warna berdasarkan tema yang dipilih
    const themeClasses = {
        emerald: {
            cardHover: 'hover:border-emerald-200 hover:shadow-emerald-100/50',
            iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
            trendBg: 'bg-emerald-50 text-emerald-700 border border-emerald-100/50',
            badge: 'bg-emerald-500',
        },
        teal: {
            cardHover: 'hover:border-teal-200 hover:shadow-teal-100/50',
            iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
            trendBg: 'bg-teal-50 text-teal-700 border border-teal-100/50',
            badge: 'bg-teal-500',
        },
        earth: {
            cardHover: 'hover:border-amber-200 hover:shadow-amber-100/30',
            iconBg: 'bg-amber-900/5 text-amber-800 border border-amber-900/10',
            trendBg: 'bg-amber-50 text-amber-950 border border-amber-900/10',
            badge: 'bg-amber-750',
        },
        gold: {
            cardHover: 'hover:border-amber-300 hover:shadow-amber-100/60',
            iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
            trendBg: 'bg-amber-50 text-amber-700 border border-amber-100/50',
            badge: 'bg-amber-500',
        }
    };

    const activeTheme = themeClasses[theme] || themeClasses.emerald;

    return (
        <div
            onClick={onClick}
            className={`group bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[175px] ${activeTheme.cardHover}`}
        >
            {/* Ornamen latar belakang halus untuk aksen profesional */}
            <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-125 ${activeTheme.badge}`} />

            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
                        {title}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${activeTheme.iconBg}`}>
                        {IconComponent ? <IconComponent size={20} className="stroke-[2.2]" /> : <HelpCircle size={20} />}
                    </div>
                </div>

                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-1">
                    {valuePrefix}{formatNumber(displayValue)}{valueSuffix}
                </h3>
            </div>

            <div className="mt-2 space-y-2">
                <p className="text-xs text-stone-500 leading-relaxed font-medium">
                    {desc}
                </p>

                {trendText && (
                    <div className="flex items-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeTheme.trendBg}`}>
                            {trendType === 'positive' ? (
                                <TrendingUp size={10} className="stroke-[2.5]" />
                            ) : (
                                <AlertCircle size={10} className="stroke-[2.5]" />
                            )}
                            {trendText}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// 2. KOMPONEN PENDUKUNG: DETAIL MODAL (RESPONSIF DESKTOP & MOBILE BOTTOM-SHEET)
// ============================================================================
function DetailModal({ isOpen, onClose, data }) {
    const [shouldRender, setShouldRender] = useState(false);
    const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-8 sm:translate-y-4 sm:scale-95');

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                setAnimationClass('opacity-100 translate-y-0 sm:scale-100');
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setAnimationClass('opacity-0 translate-y-8 sm:translate-y-4 sm:scale-95');
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender || !data) return null;

    return (
        <div className="fixed inset-0  flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
            {/* Latar Belakang Transparan Blur (Backdrop) */}
            <div
                className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Konten Kotak Modal / Bottom Sheet */}
            <div
                className={`relative bg-white w-full sm:max-w-lg rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl border border-stone-200/80 z-50 transform transition-all duration-300 ease-out max-h-[92vh] sm:max-h-[85vh] flex flex-col ${animationClass}`}
            >
                {/* Indikator Tarik khusus perangkat mobile */}
                <div className="w-12 h-1.5 bg-stone-300/80 rounded-full mx-auto my-3 flex-shrink-0 sm:hidden" />

                {/* Tombol Tutup pojok kanan atas */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 sm:right-6 sm:top-6 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20"
                >
                    <X size={18} />
                </button>

                {/* Bagian Scrollable Konten Modal */}
                <div className="overflow-y-auto px-6 pb-8 pt-2 sm:pt-8 sm:px-8 space-y-6 flex-1">
                    {/* Header Modal */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center flex-shrink-0">
                            <Activity size={24} className="stroke-[2]" />
                        </div>
                        <div className="pr-8">
                            <h4 className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider">Rincian Informasi</h4>
                            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">{data.title}</h3>
                        </div>
                    </div>

                    {/* Ringkasan Angka Utama */}
                    <div className="bg-gradient-to-br from-stone-50 to-emerald-50/20 rounded-2xl p-4 border border-stone-100 flex justify-between items-center gap-2">
                        <div>
                            <p className="text-xs text-stone-500 font-medium">{data.primaryMetricLabel}</p>
                            <p className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{data.primaryMetricValue}</p>
                        </div>
                        {data.growth && (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/50 border border-emerald-200 px-3 py-1 rounded-full flex-shrink-0">
                                <ArrowUpRight size={14} className="stroke-[2.5]" />
                                {data.growth}
                            </span>
                        )}
                    </div>

                    {/* Metrik Grid Finansial */}
                    <div className="space-y-4">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Metrik Finansial & Operasional</h5>

                        <div className="grid grid-cols-2 gap-3.5">
                            {data.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-stone-50/50 rounded-xl p-3.5 border border-stone-200/40 hover:bg-stone-50 transition-colors">
                                    <span className="text-[11px] text-stone-500 font-medium block leading-tight">{metric.label}</span>
                                    <span className="text-sm sm:text-base font-bold text-stone-900 mt-1 block leading-tight">{metric.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* List Kategori Tambahan / Sumber Pendapatan */}
                        {data.detailsList && (
                            <div className="mt-6 border-t border-stone-100 pt-5">
                                <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                                    {data.detailsListTitle}
                                </h5>
                                <div className="space-y-2">
                                    {data.detailsList.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/20 gap-4">
                                            <span className="text-xs font-semibold text-stone-700 truncate">{item.name}</span>
                                            <span className="text-xs font-bold text-stone-900 flex-shrink-0">{item.value || 'Aktif'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tombol Aksi Bawah */}
                <div className="p-5 sm:p-6 border-t border-stone-100 bg-stone-50/80 rounded-b-3xl flex gap-3 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl transition-all"
                    >
                        Tutup Jendela
                    </button>
                    <button className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-md">
                        Unduh Laporan PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// 3. KOMPONEN UTAMA: VENDOR DASHBOARD (EXPORT UTAMA)
// ============================================================================
export default function VendorDashboard() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Struktur Data Lengkap untuk Modal Detail Interaktif
    const cardDetailPayloads = {
        revenue: {
            title: 'Detail Pendapatan Agribisnis',
            primaryMetricLabel: 'Pendapatan Bulan Ini',
            primaryMetricValue: 'Rp12.200.000',
            growth: '+12.3%',
            metrics: [
                { label: 'Pendapatan Bulan Lalu', value: 'Rp10.500.000' },
                { label: 'Rata-rata Harian', value: 'Rp400.000' }
            ],
            detailsListTitle: 'Sumber Pendapatan Komoditas',
            detailsList: [
                { name: 'Penjualan Cabai Rawit Organik', value: 'Rp5.000.000' },
                { name: 'Penjualan Tomat Beef Premium', value: 'Rp4.000.000' },
                { name: 'Penjualan Sayuran Hijau Organik', value: 'Rp3.000.000' }
            ]
        },
        sales: {
            title: 'Detail Penjualan & Transaksi',
            primaryMetricLabel: 'Total Transaksi Sukses',
            primaryMetricValue: '50 Pesanan',
            growth: '+8.2%',
            metrics: [
                { label: 'Pesanan Selesai', value: '220 Unit' },
                { label: 'Sedang Diproses', value: '25 Unit' }
            ],
            detailsListTitle: 'Informasi Produk Terlaris',
            detailsList: [
                { name: 'Cabai Rawit Organik (Terlaris)', value: '110 Pesanan' },
                { name: 'Alpukat Mentega Super', value: '85 Pesanan' },
                { name: 'Tomat Hidroponik Premium', value: '50 Pesanan' }
            ]
        },
        products: {
            title: 'Detail Status Inventaris Produk',
            primaryMetricLabel: 'Katalog Produk Aktif',
            primaryMetricValue: '120 Produk',
            growth: null,
            metrics: [
                { label: 'Perlu Stok Tambahan', value: '15 Produk' },
                { label: 'Stok Sangat Aman', value: '105 Produk' }
            ],
            detailsListTitle: 'Kategori Produk Terbanyak',
            detailsList: [
                { name: 'Kategori Sayuran Segar', value: '65 Varian' },
                { name: 'Kategori Buah Hortikultura', value: '35 Varian' },
                { name: 'Kategori Benih Unggulan', value: '20 Varian' }
            ]
        },
        investment: {
            title: 'Detail Pendanaan & Investasi',
            primaryMetricLabel: 'Total Dana Investasi',
            primaryMetricValue: 'Rp12.307.692',
            growth: '65% Terpenuhi',
            metrics: [
                { label: 'Jumlah Investor Aktif', value: '12 Orang' },
                { label: 'Proyek Lahan Berjalan', value: '3 Lokasi' }
            ],
            detailsListTitle: 'Status Alokasi Lahan Kemitraan',
            detailsList: [
                { name: 'Lahan Cabai Kebon Rejo', value: 'Berjalan (80%)' },
                { name: 'Greenhouse Tomat Selo', value: 'Berjalan (55%)' },
                { name: 'Lahan Sayur Baturaden', value: 'Tahap Persiapan' }
            ]
        }
    };

    const handleCardClick = (key) => {
        setSelectedCard(cardDetailPayloads[key]);
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar1 />

            <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-emerald-50/10 to-amber-50/10 p-4 md:p-8 overflow-hidden">

                {/* ----------------- LATAR BELAKANG PREMIUM (AMBIENT MESH GRID) ----------------- */}

                {/* 1. Pola Grid Titik Agrotech (Emerald Dot Grid) */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

                {/* 2. Blob Ambiens Kiri Atas (Emerald Soft Circle) */}
                <div className="absolute -top-[15%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-[130px] pointer-events-none" />

                {/* 3. Blob Ambiens Kanan Bawah (Wheat/Gold Soft Circle) */}
                <div className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-100/35 blur-[130px] pointer-events-none" />

                {/* ---------------------------------------------------------------------------- */}

                <div className=" relative max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-top-4 duration-500 z-10">

                    {/* Laman Header Utama */}
                    <div className="flex items-start gap-4">
                        {/* Pilar Aksen Warna di Samping Judul */}
                        <div className="w-1.5 h-12 md:h-16 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full flex-shrink-0" />

                        <div>
                            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-900 bg-clip-text text-transparent tracking-tight leading-none">
                                Ikhtisar Kinerja Bisnis
                            </h2>
                            <p className="text-xs md:text-sm text-stone-500 mt-2 font-medium max-w-xl leading-relaxed">
                                Klik pada setiap kartu untuk meninjau rincian keuangan dan operasional agribisnis Anda secara interaktif.
                            </p>
                        </div>
                    </div>

                    {/* Grid Kartu Utama */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <SummaryCard
                            title="Total Pendapatan"
                            rawValue={12200000}
                            valuePrefix="Rp"
                            desc="Pendapatan bersih dari transaksi penjualan langsung"
                            trendText="+12.3% dibanding bulan lalu"
                            trendType="positive"
                            icon={Wallet}
                            theme="emerald"
                            onClick={() => handleCardClick('revenue')}
                        />

                        <SummaryCard
                            title="Total Penjualan"
                            rawValue={50}
                            valueSuffix=" Pesanan"
                            desc="Jumlah keseluruhan transaksi pesanan berhasil"
                            trendText="+8.2% dibanding bulan lalu"
                            trendType="positive"
                            icon={ShoppingCart}
                            theme="teal"
                            onClick={() => handleCardClick('sales')}
                        />

                        <SummaryCard
                            title="Total Produk"
                            rawValue={120}
                            valueSuffix=" Produk"
                            desc="Jumlah katalog komoditas aktif di pasar"
                            trendText="15 produk membutuhkan stok tambahan"
                            trendType="negative"
                            icon={Leaf}
                            theme="earth"
                            onClick={() => handleCardClick('products')}
                        />

                        <SummaryCard
                            title="Total Investasi Diterima"
                            rawValue={8000000}
                            valuePrefix="Rp"
                            desc="Dana terkumpul dari investor mitra pertanian"
                            trendText="65% target investasi tercapai"
                            trendType="positive"
                            icon={HandCoins}
                            theme="gold"
                            onClick={() => handleCardClick('investment')}
                        />

                    </div>

                    {/* Modal Detail Interaktif */}
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={selectedCard}
                    />

                </div>
            </div>
            <Anal />
            <Racent />
        </>
    );
}